import ErrorPage from "@/pages/error";
import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {hasError: true, error, errorInfo: null};
  }

  componentDidCatch(_error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({errorInfo});
    // You can log errors to an error reporting service here
  }

  resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <ErrorPage
            error={this.state.error}
            errorInfo={this.state.errorInfo}
            onReset={this.resetErrorBoundary}
          />
        )
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
