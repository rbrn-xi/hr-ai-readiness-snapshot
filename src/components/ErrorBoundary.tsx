import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="page">
          <div className="container">
            <div className="brand">
              fyhr<span className="dot">.</span>
            </div>
            <div className="card error-card">
              <h1>Something went wrong.</h1>
              <p>Please reload the page and try again.</p>
              <button
                className="button button-primary"
                type="button"
                onClick={() => window.location.reload()}
              >
                Reload the page
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
