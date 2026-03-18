import { NextResponse } from 'next/server';

export async function POST() {
  const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

  if (!N8N_WEBHOOK_URL) {
    return NextResponse.json(
      { error: 'N8N_WEBHOOK_URL is not configured' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'run_scan', source: 'dashboard' }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `n8n responded with status ${response.status}` },
        { status: response.status }
      );
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return NextResponse.json(data);
    }

    // Fallback for successful but non-JSON responses (n8n test mode often does this)
    return NextResponse.json({ 
      report: "# Scan Captured\n\nn8n captured the trigger. Pending analyst processing...",
      tldr: "Scan signal received by n8n agents.",
      status: "success"
    });
  } catch (error) {
    console.error('Scan proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to communicate with analyst agents' },
      { status: 500 }
    );
  }
}
