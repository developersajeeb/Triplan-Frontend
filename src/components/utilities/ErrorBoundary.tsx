import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
          <div className="text-5xl">⚠️</div>
          <h2 className="text-2xl font-semibold text-gray-800">Something went wrong</h2>
          <p className="max-w-md text-gray-500">
            An unexpected error occurred. Please try refreshing the page or
            contact support if the problem persists.
          </p>
          {import.meta.env.DEV && this.state.error && (
            <pre className="mt-2 max-w-xl overflow-auto rounded bg-red-50 p-3 text-left text-xs text-red-700">
              {this.state.error.message}
            </pre>
          )}
          <div className="flex gap-3">
            <button
              onClick={this.handleReset}
              className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.replace("/")}
              className="rounded-md border px-5 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Go Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
