import { Component } from "react";

// React error boundary. Catches render errors anywhere below it so one
// broken page does not blank the whole site. Offers a reset (retry) and
// a way back home. Error details are logged locally only — never sent
// anywhere (this site has no analytics and sends nothing).
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("Tools Websites Directory error boundary caught:", error, info);
  }
  handleReset = () => this.setState({ hasError: false, error: null });
  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="container section" role="alert">
        <h1>Something went wrong</h1>
        <p>
          This page hit an unexpected error. The rest of the site is not affected, and nothing
          you typed was sent anywhere.
        </p>
        <p className="notice">
          {this.state.error ? String(this.state.error.message || this.state.error) : "Unknown error"}
        </p>
        <div className="toolbar">
          <button type="button" className="button" onClick={this.handleReset}>Try again</button>{" "}
          <a className="button button-secondary" href={import.meta.env.BASE_URL}>Go to the homepage</a>
        </div>
      </div>
    );
  }
}
