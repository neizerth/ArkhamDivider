import { Component, ErrorInfo } from "react";

export type ErrorBoundaryProps = {
	fallback?: React.ReactElement;
	children: React.ReactNode;
};

export class ErrorBoundary extends Component {
	state = { hasError: false };
	constructor(public props: ErrorBoundaryProps) {
		super(props);
	}

	static getDerivedStateFromError() {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error: Error, info: ErrorInfo) {
		// Example "componentStack":
		//   in ComponentThatThrows (created by App)
		//   in ErrorBoundary (created by App)
		//   in div (created by App)
		//   in App
		console.error(error, info.componentStack);
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return this.props.fallback;
		}

		return this.props.children;
	}
}
