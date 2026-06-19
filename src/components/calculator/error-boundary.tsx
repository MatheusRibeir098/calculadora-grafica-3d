"use client";

import React from "react";

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 p-8 bg-surface text-text-primary">
          <p className="text-lg">Algo deu errado</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded bg-accent-pink text-white"
          >
            Recarregar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
