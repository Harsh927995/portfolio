// @ts-nocheck
import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in DEV_CORE runtime:', error, errorInfo);
  }

  public handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#121414] text-[#e2e2e2] flex items-center justify-center p-6 font-sans">
          <div className="w-full max-w-lg p-8 rounded-2xl bg-[#0c0f0f] border border-red-500/30 shadow-[0_0_40px_rgba(255,0,0,0.2)] text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="font-display text-2xl font-bold text-[#e1fdff]">
                SYSTEM KERNEL EXCEPTION
              </h2>
              <p className="font-mono text-xs text-red-400">
                {this.state.error?.message || 'An unexpected runtime state was detected.'}
              </p>
              <p className="text-sm text-[#b9cacb] pt-2">
                A non-critical rendering fault occurred. Click below to reboot the DEV_CORE interface.
              </p>
            </div>

            <button
              onClick={this.handleReload}
              className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#00f2ff] text-[#002022] font-display font-bold text-sm hover:shadow-[0_0_20px_rgba(0,242,255,0.5)] transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reboot Kernel</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
