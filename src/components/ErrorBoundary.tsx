import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center px-6 text-center bg-background text-foreground">
          <div className="max-w-md">
            <p className="text-5xl mb-6 select-none">⚠️</p>
            <h2 className="text-2xl font-semibold tracking-tight mb-2">
              Something went wrong
            </h2>
            <p className="text-sm text-muted-foreground mb-2">
              An unexpected error occurred while rendering this page.
            </p>
            {import.meta.env.DEV && this.state.message && (
              <pre className="text-xs text-left bg-muted text-muted-foreground rounded-lg px-4 py-3 mb-6 overflow-auto">
                {this.state.message}
              </pre>
            )}
            {!import.meta.env.DEV && <div className="mb-6" />}
            <button
              className="hero-btn-primary"
              onClick={() => this.setState({ hasError: false, message: '' })}
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
