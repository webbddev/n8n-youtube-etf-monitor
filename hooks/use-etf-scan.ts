"use client"

import { useState, useCallback, useEffect } from "react"

export type ScanResult = {
  digest: string
  videoUrl?: string
  tldr?: string
  timestamp: string
}

export function useETFScan() {
  const [status, setStatus] = useState<"idle" | "scanning" | "complete" | "error">("idle")
  const [result, setResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("etf_latest_scan")
    if (saved) {
      try {
        setResult(JSON.parse(saved))
        setStatus("complete")
      } catch (e) {
        console.error("Failed to parse saved scan", e)
      }
    }
  }, [])

  const runScan = useCallback(async () => {
    setStatus("scanning")
    setError(null)

    try {
      // Proxying via local API to bypass CORS
      const response = await fetch('/api/scan', {
        method: 'POST',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Analyst agents failed to respond: ${response.statusText}`)
      }

      const data = await response.json()
      
      const normalize = (payload: any): any => {
        if (!payload) return {};
        if (Array.isArray(payload)) return normalize(payload[0]);
        // If it's a string, try to see if it's stringified JSON (common in n8n)
        if (typeof payload === 'string') {
          const trimmed = payload.trim();
          if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
            try { return normalize(JSON.parse(trimmed)); } catch(e) { return payload; }
          }
          return payload;
        }
        return payload;
      };

      const flatData = normalize(data);
      
      const extractField = (primary: any, secondaries: any[]) => {
        const val = primary || secondaries.find(s => s !== undefined && s !== null);
        if (!val) return "";
        
        // If we found an object/array instead of a string, try to normalize it too
        const safeVal = (typeof val === 'object') ? normalize(val) : val;
        
        let result = "";
        if (typeof safeVal === 'string') result = safeVal;
        else if (typeof safeVal === 'object' && safeVal.output) result = String(safeVal.output);
        else if (typeof safeVal === 'object') result = JSON.stringify(safeVal, null, 2);
        else result = String(safeVal);

        // Heavy cleaning to turn raw n8n text into an "Article"
        let cleaned = result
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

      const digest = extractField(flatData.report, [flatData.output, flatData.digest, flatData.markdown, flatData.text]);
      
      const findYouTubeUrl = (obj: any): string | null => {
        if (!obj) return null;
        if (typeof obj === 'string') {
          const ytPattern = /(https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|shorts\/)?[\w-]{11})/i;
          const match = obj.match(ytPattern);
          return match ? match[0] : null;
        }
        if (typeof obj === 'object') {
          for (const key in obj) {
            const found = findYouTubeUrl(obj[key]);
            if (found) return found;
          }
        }
        return null;
      };

      const videoUrl = findYouTubeUrl(data) || findYouTubeUrl(digest);

      const newResult: ScanResult = {
        digest: digest,
        videoUrl: String(videoUrl || ""),
        tldr: extractField(flatData.tldr, [flatData.summary, flatData.headline]),
        timestamp: new Date().toISOString(),
      }

      setResult(newResult)
      setStatus("complete")
      localStorage.setItem("etf_latest_scan", JSON.stringify(newResult))
    } catch (err) {
      console.error("Scan error:", err)
      setError(err instanceof Error ? err.message : "Neural transcription failed. Please try again.")
      setStatus("error")
    }
  }, [])

  const resetScan = useCallback(() => {
    setStatus("idle")
    setResult(null)
    localStorage.removeItem("etf_latest_scan")
  }, [])

  return { runScan, resetScan, status, result, error }
}
