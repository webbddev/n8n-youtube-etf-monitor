'use client';

import { useState, useCallback, useEffect } from 'react';

export type ScanResult = {
  digest: string;
  videoUrl?: string;
  tldr?: string;
  timestamp: string;
};

type NormalizedData = {
  report?: unknown;
  output?: unknown;
  digest?: unknown;
  markdown?: unknown;
  text?: unknown;
  tldr?: unknown;
  summary?: unknown;
  headline?: unknown;
  [key: string]: unknown;
};

export function useETFScan() {
  const [status, setStatus] = useState<
    'idle' | 'scanning' | 'complete' | 'error'
  >('idle');
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('etf_latest_scan');
    if (saved) {
      try {
        setResult(JSON.parse(saved) as ScanResult);
        setStatus('complete');
      } catch (e) {
        console.error('Failed to parse saved scan', e);
      }
    }
  }, []);

  const runScan = useCallback(async () => {
    setStatus('scanning');
    setError(null);

    try {
      // Proxying via local API to bypass CORS
      const response = await fetch('/api/scan', {
        method: 'POST',
      });

      if (!response.ok) {
        let errorMessage = `Analyst agents failed to respond: ${response.statusText}`;
        try {
          const errorData = (await response.json()) as { error?: string };
          errorMessage = errorData.error || errorMessage;
        } catch {
          // If response isn't JSON, use status text
        }
        throw new Error(errorMessage);
      }

      const data = (await response.json()) as unknown;
      console.log('Received data from n8n:', data);

      const normalize = (payload: unknown): NormalizedData => {
        if (!payload) return {};
        if (Array.isArray(payload)) return normalize(payload[0]);
        // If it's a string, try to see if it's stringified JSON (common in n8n)
        if (typeof payload === 'string') {
          const trimmed = payload.trim();
          if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
            try {
              return normalize(JSON.parse(trimmed));
            } catch {
              return {};
            }
          }
          return {};
        }
        return payload as NormalizedData;
      };

      const flatData = normalize(data);
      console.log('Normalized data:', flatData);

      const extractField = (
        primary: unknown,
        secondaries: unknown[],
      ): string => {
        const val =
          primary ||
          secondaries.find((s) => s !== undefined && s !== null && s !== '');
        if (!val) return '';

        // If we found an object/array instead of a string, try to normalize it too
        const safeVal =
          typeof val === 'object' && val !== null ? normalize(val) : val;

        let result = '';
        if (typeof safeVal === 'string') result = safeVal;
        else if (
          typeof safeVal === 'object' &&
          safeVal !== null &&
          'output' in safeVal
        )
          result = String(safeVal.output);
        else if (typeof safeVal === 'object' && safeVal !== null)
          result = JSON.stringify(safeVal, null, 2);
        else result = String(safeVal);

        // Heavy cleaning to turn raw n8n text into an "Article"
        const cleaned = result
          .replace(/\\n/g, '\n')
          .replace(/\\"/g, '"')
          // Fix jammed paragraphs: if a line ends and the next starts with Bold or Header/List
          .replace(/([.!?])\s*\n(\*{2}|#|-|\d\.)/g, '$1\n\n$2')
          // Add spacing before any bold bullet points that are jammed
          .replace(/([a-z0-9])\n(\*{2})/gi, '$1\n\n$2')
          // Ensure double spacing between existing single newlines followed by a capital
          .replace(/\n(?=[A-Z])/g, '\n\n')
          .trim();

        return cleaned;
      };

      const digest = extractField(flatData.report, [
        flatData.output,
        flatData.digest,
        flatData.markdown,
        flatData.text,
      ]);
      console.log('Extracted digest:', digest);

      const findYouTubeUrl = (obj: unknown): string | null => {
        if (!obj) return null;
        if (typeof obj === 'string') {
          const ytPattern =
            /(https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|shorts\/)?[\w-]{11})/i;
          const match = obj.match(ytPattern);
          return match ? match[0] : null;
        }
        if (typeof obj === 'object' && obj !== null) {
          for (const key in obj) {
            try {
              const found = findYouTubeUrl(
                (obj as Record<string, unknown>)[key],
              );
              if (found) return found;
            } catch {
              // Skip circular references or errors
            }
          }
        }
        return null;
      };

      const videoUrl = findYouTubeUrl(data) || findYouTubeUrl(digest);
      console.log('Found video URL:', videoUrl);

      const tldr = extractField(flatData.tldr, [
        flatData.summary,
        flatData.headline,
      ]);
      console.log('Extracted tldr:', tldr);

      const newResult: ScanResult = {
        digest: digest || 'No digest available from the scan.',
        videoUrl: String(videoUrl || ''),
        tldr: tldr,
        timestamp: new Date().toISOString(),
      };

      console.log('Final result to save:', newResult);
      setResult(newResult);
      setStatus('complete');
      localStorage.setItem('etf_latest_scan', JSON.stringify(newResult));
    } catch (err) {
      console.error('Scan error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Neural transcription failed. Please try again.',
      );
      setStatus('error');
    }
  }, []);

  const resetScan = useCallback(() => {
    setStatus('idle');
    setResult(null);
    localStorage.removeItem('etf_latest_scan');
  }, []);

  return { runScan, resetScan, status, result, error };
}
