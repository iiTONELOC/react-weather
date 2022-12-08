import { DisplayError } from './helpers';
import type { Props, State } from './interfaces';
import { Component, ErrorInfo, ReactNode } from 'react';



class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true, error: _, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        logError(error, errorInfo);
        this.setErrorInfo(errorInfo);
    }

    public setErrorInfo(errorInfo: ErrorInfo): void {
        this.setState((prevState: State) => ({
            ...prevState,
            errorInfo
        }));
    }

    public clearError(self: ErrorBoundary): void { // NOSONAR
        self.setState({ hasError: false, error: null, errorInfo: null });
    }

    public clearErrorAndReload(self: ErrorBoundary): void { // NOSONAR
        self.clearError(self);
        window.location.reload();
    }

    public render(): ReactNode {
        if (this.state.hasError) {
            return DisplayError(this.state, this);
        }

        return this.props.children;
    }
}


function logError(error: Error, errorInfo: ErrorInfo): void {
    console.error(`Oh no! There was an uncaught error!\n ${error}\n`, errorInfo); // NOSONAR
}

export default ErrorBoundary;
