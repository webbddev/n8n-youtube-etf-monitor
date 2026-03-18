"use client"

import * as React from "react"
import ReactMarkdown from "react-markdown"
import { 
  TrendingUp, 
  Cpu, 
  Youtube, 
  Clock, 
  Maximize2, 
  LayoutDashboard,
  Zap,
  Globe,
  Wallet
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useETFScan } from "@/hooks/use-etf-scan"

export function Dashboard() {
  const { runScan, resetScan, status, result, error } = useETFScan()

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 font-sans text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background Ambience */}
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] size-96 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[10%] left-[5%] size-80 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Header Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-slate-950/60 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center rounded-sm bg-amber-500/10 p-1.5 ring-1 ring-amber-500/20">
              <TrendingUp className="size-4 text-amber-500 shadow-amber-500/30" />
            </div>
            <h1 className="text-sm font-medium uppercase tracking-[0.2em] text-slate-300">
              🏦 ETF <span className="text-amber-500 font-bold">ALPHALYZER</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            {status === 'complete' && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetScan}
                aria-label="Reset Market Scan"
                className="h-11 rounded-[2px] border-white/10 bg-white/5 hover:bg-white/10 text-[11px] uppercase tracking-wider px-6"
              >
                Reset Result
              </Button>
            )}
            <Badge variant="outline" className="h-6 rounded-[2px] border-emerald-500/30 bg-emerald-500/10 text-[10px] text-emerald-400 font-mono uppercase tracking-widest">
              Live Terminal v4.2
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content Fragmented Layout */}
      <main className="relative mx-auto mt-8 max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        
        {/* Layout Grid: Fractional 80/20 Style */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          
          {/* Main Content Area (80%) */}
          <div className="flex-1 space-y-6">
            
            {/* Action Card: Terminal UI */}
            {(status === 'idle' || status === 'error') && (
              <Card className="group relative overflow-hidden rounded-[2px] border-white/[0.08] bg-slate-900/40 shadow-2xl ring-1 ring-white/5 backdrop-blur-2xl transition-all hover:border-amber-500/30">
                <div className="absolute inset-x-0 h-[1px] top-0 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent transition-opacity group-hover:via-amber-500/60" />
                <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full scale-150 animate-pulse" />
                    <div className="relative flex items-center justify-center rounded-sm border border-amber-500/30 bg-slate-900 p-5 ring-4 ring-amber-500/5 shadow-[0_0_50px_rgba(245,158,11,0.15)]">
                      <LayoutDashboard className="size-10 text-amber-500" />
                    </div>
                  </div>
                  <h2 className="mb-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">Deep Transcript Analysis</h2>
                  <p className="mx-auto mb-10 max-w-lg text-slate-400 leading-relaxed font-light italic">
                    Connect our high-frequency neural agents to process YouTube transcripts for immediate UCITS market implications.
                  </p>
                  
                  {error && (
                    <div className="mb-8 rounded-[2px] border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400 font-mono">
                      {error}
                    </div>
                  )}

                  <Button 
                    size="lg" 
                    onClick={runScan}
                    aria-label="Initiate Market Scan"
                    className="relative h-14 rounded-[2px] px-10 bg-amber-500 text-slate-950 font-bold uppercase tracking-[0.1em] shadow-[0_15px_30px_rgba(245,158,11,0.3)] hover:bg-amber-400 hover:shadow-[0_20px_40px_rgba(245,158,11,0.4)] hover:-translate-y-1 transition-all active:translate-y-0.5 active:shadow-inner overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Run Market Scan
                      <Zap className="size-4 fill-current" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[200%] transition-transform duration-1000 group-hover:translate-x-[200%]" />
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Scanning State: Digital Ghost Skeletons */}
            {status === 'scanning' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-700">
                <Card className="rounded-[2px] border-white/[0.08] bg-slate-900/40 shadow-2xl ring-1 ring-white/5 backdrop-blur-2xl overflow-hidden relative">
                  <div className="absolute top-0 inset-x-0 h-1 bg-amber-500/20 overflow-hidden">
                    <div className="h-full bg-amber-500 w-[40%] animate-progress-indeterminate" />
                  </div>
                  <CardContent className="py-12 px-8">
                    <div className="flex items-start gap-6">
                      <div className="relative h-16 w-16 shrink-0 bg-slate-800 rounded-sm overflow-hidden flex items-center justify-center border border-white/5">
                        <Cpu className="size-8 text-amber-500 animate-pulse" />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
                      </div>
                      <div className="flex-1 space-y-4 pt-1">
                        <div className="h-6 w-[50%] bg-slate-800 rounded-sm animate-pulse mb-1 flex items-center gap-2">
                          <div className="size-3 rounded-full bg-amber-500/40 animate-ping" />
                          <span className="text-[10px] font-mono text-amber-500/60 uppercase tracking-tighter">Financial Analysis in Progress...</span>
                        </div>
                        <div className="space-y-2">
                          <div className="h-4 w-full bg-slate-800/60 rounded-sm animate-pulse" />
                          <div className="h-4 w-[90%] bg-slate-800/40 rounded-sm animate-pulse" />
                          <div className="h-4 w-[40%] bg-slate-800/20 rounded-sm animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid gap-6 sm:grid-cols-2">
                  {[1, 2].map((i) => (
                    <Card key={i} className="rounded-[2px] border-white/[0.08] bg-slate-900/40 h-48 animate-pulse backdrop-blur-2xl" />
                  ))}
                </div>
              </div>
            )}

            {/* Complete State: The Report */}
            {status === 'complete' && result && (
              <div className="space-y-6 animate-in fade-in duration-1000">
                {/* Executive Summary (TL;DR Callout) */}
                <Card className="relative overflow-hidden rounded-[2px] border-l-4 border-amber-500 border-t border-r border-b border-white/[0.08] bg-amber-500/[0.02] backdrop-blur-2xl">
                   <div className="absolute top-0 right-0 p-3 opacity-10">
                     <Clock className="size-16 rotate-12" />
                   </div>
                   <CardContent className="p-8">
                     <div className="flex items-center gap-3 mb-4">
                       <Badge className="bg-amber-500 text-slate-950 font-bold rounded-sm text-[10px] uppercase">Analysis Hot</Badge>
                       <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono">
                         Executed: {new Date(result.timestamp).toLocaleTimeString()}
                       </span>
                     </div>
                     <h3 className="text-xl font-bold italic leading-relaxed text-amber-200/90 text-balance">
                       &ldquo;{result.tldr || (result.digest || '').match(/[^.!?\n]{40,}[.!?]/)?.[0]?.trim() || ''}&rdquo;
                     </h3>
                   </CardContent>
                </Card>

                {/* Investor Digest (Markdown Area) */}
                <Card className="rounded-[2px] border-white/[0.08] bg-slate-900/40 shadow-2xl ring-1 ring-white/5 backdrop-blur-2xl">
                  <div className="border-b border-white/[0.05] bg-white/[0.02] px-8 py-4 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Comprehensive Analysis Report</span>
                    <Maximize2 className="size-3 text-slate-500 cursor-pointer hover:text-amber-500 transition-colors" />
                  </div>
                  <CardContent className="px-10 py-10 sm:px-14 sm:py-12">
                    <article className="mx-auto max-w-[70ch]">
                      <ReactMarkdown
                        components={{
                          h1: ({node: _n, ...props}) => <h1 className="text-2xl font-extrabold text-white mt-10 mb-5 pb-3 border-b border-white/10 uppercase tracking-wider" {...props} />,
                          h2: ({node: _n, ...props}) => <h2 className="text-lg font-bold text-amber-300 mt-10 mb-4 uppercase tracking-wide" {...props} />,
                          h3: ({node: _n, ...props}) => <h3 className="text-sm font-bold text-amber-400/80 mt-8 mb-3 uppercase tracking-widest" {...props} />,
                          p: ({node: _n, ...props}) => <p className="mb-6 leading-[1.9] text-slate-300 text-[15px]" {...props} />,
                          strong: ({node: _n, ...props}) => <strong className="font-bold text-white" {...props} />,
                          ul: ({node: _n, ...props}) => <ul className="my-5 ml-6 space-y-3 list-disc marker:text-amber-500" {...props} />,
                          li: ({node: _n, ...props}) => <li className="text-slate-300 leading-[1.8] text-[15px] pl-1" {...props} />,
                          a: ({node: _n, href, ...props}) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-amber-400 underline underline-offset-4 hover:text-amber-300 transition-colors" {...props} />,
                          hr: () => <hr className="my-10 border-white/10" />,
                        }}
                      >
                        {typeof result.digest === 'string' ? result.digest : String(result.digest || '# Neural Silence\n\nNo transcription data was captured for this interval.')}
                      </ReactMarkdown>
                    </article>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Context Sidebar Area (20% - Sticky on Desktop) */}
          <aside className="w-full lg:w-72 space-y-6">
            
            {/* Regional Card: Chisinau/European Context */}
            <Card className="relative overflow-hidden rounded-[2px] border-white/[0.08] bg-slate-900/40 shadow-xl backdrop-blur-3xl ring-1 ring-emerald-500/10">
              <div className="absolute top-0 right-0 h-24 w-24 bg-emerald-500/5 blur-3xl pointer-events-none" />
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="size-4 text-emerald-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Regional Context</span>
                  </div>
                  <Badge variant="outline" className="h-5 rounded-sm border-emerald-500/20 text-[9px] text-emerald-500">Chisinau High-Priority</Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="rounded-sm bg-slate-950/50 p-3 border border-white/[0.05]">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 rounded-full bg-emerald-500/20 p-1">
                        <Wallet className="size-3 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-[11px] font-medium text-slate-200">IBKR Integration Status</p>
                        <p className="text-[10px] text-slate-500">Regional SEPA/MDL verified</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold text-slate-300">Focus Instruments (UCITS)</p>
                    <div className="flex flex-wrap gap-1.5">
                      <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] px-1.5 py-0 h-4 font-mono">VWCE.DE</Badge>
                      <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] px-1.5 py-0 h-4 font-mono">CSPX.AS</Badge>
                      <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] px-1.5 py-0 h-4 font-mono">IWDA.L</Badge>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed font-light italic">
                    Analysis tailored for Moldovan retail investors utilizing European brokerage gateways. All tickers are EUR-denominated UCITS domiciled unless stated otherwise.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Neural Protocol Card (Reflective UX) */}
            <Card className="rounded-[2px] border-white/[0.08] bg-slate-900/40 p-4">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-amber-500/80 mb-2">Neural Protocol</h4>
              <p className="text-[10px] text-slate-500 leading-normal">
                Our agents analyze raw frequency data from Tier 1 financial commentary to distill actionable UCITS-denominated intelligence for the Chisinau corridor.
              </p>
            </Card>

            {/* Video Link Footer Card */}
            {status === 'complete' && result && (
              <Card className="rounded-[2px] border-white/[0.08] bg-slate-900/40 shadow-xl backdrop-blur-3xl p-1 group">
                <a 
                  href={result.videoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-[1px] hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center justify-center h-10 w-10 bg-red-500/10 border border-red-500/20 rounded-sm transition-transform group-hover:scale-105">
                    <Youtube className="size-5 text-red-500" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Original Intelligence</p>
                    <p className="text-[11px] text-slate-200 truncate group-hover:text-amber-500 transition-colors">View YouTube Intel</p>
                  </div>
                </a>
              </Card>
            )}

            {/* System Metrics (Fintech Flavour) */}
            <div className="px-4 space-y-4">
               <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-mono uppercase text-slate-600">Model Load</span>
                    <span className="text-[9px] font-mono text-emerald-500">STABLE</span>
                  </div>
                  <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500/50 w-[78%]" />
                  </div>
               </div>
               <div className="flex items-center justify-between pt-2 border-t border-white/[0.03]">
                  <span className="text-[9px] font-mono uppercase text-slate-600">Region Target</span>
                  <span className="text-[9px] font-mono text-slate-400 uppercase">Chisinau, MD</span>
               </div>
            </div>

          </aside>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="mt-auto border-t border-white/[0.05] py-8 text-center bg-slate-950/40">
        <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-600">
          Neural Architecture by <span className="text-slate-400">ag-kit v4.2</span>{" // Precision FinTech Infrastructure"}
        </p>
      </footer>

      {/* Custom Styles for Progress Animation */}
      <style jsx global>{`
        @keyframes progress-indeterminate {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
        .animate-progress-indeterminate {
          animation: progress-indeterminate 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse, .animate-pulse-slow, .animate-ping, .animate-progress-indeterminate, .transition-all {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  )
}
