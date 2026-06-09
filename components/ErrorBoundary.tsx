import React, { Component, ErrorInfo, ReactNode } from 'react';
import { FaExclamationTriangle, FaRedo, FaHome } from 'react-icons/fa';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-aria-bg flex items-center justify-center px-4 py-12">
          <div className="card-3d max-w-lg w-full p-8 text-center bg-white border border-gray-100 flex flex-col items-center">
            <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <FaExclamationTriangle className="text-4xl" />
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-aria-primary mb-3">
              Oups ! Quelque chose a mal tourné.
            </h1>

            <p className="text-gray-500 font-open-sans text-sm mb-6 max-w-sm">
              Une erreur inattendue s'est produite. Nous nous excusons pour ce désagrément. 
              Veuillez recharger la page ou revenir à l'accueil.
            </p>

            {this.state.error && (
              <div className="w-full bg-gray-50 rounded-xl p-4 text-left mb-8 border border-gray-150 overflow-auto max-h-40 font-mono text-xs text-red-600 shadow-inner">
                <p className="font-bold mb-1">{this.state.error.name}: {this.state.error.message}</p>
                <pre className="whitespace-pre-wrap">{this.state.error.stack}</pre>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <button
                onClick={this.handleReload}
                className="btn-3d flex items-center justify-center gap-2 bg-aria-primary text-white font-bold px-6 py-3 rounded-full hover:bg-aria-accent transition-colors"
              >
                <FaRedo className="text-sm" /> Recharger
              </button>
              <button
                onClick={this.handleGoHome}
                className="btn-3d flex items-center justify-center gap-2 bg-gray-100 text-aria-primary font-bold px-6 py-3 rounded-full hover:bg-gray-200 transition-colors"
              >
                <FaHome className="text-sm" /> Accueil
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
