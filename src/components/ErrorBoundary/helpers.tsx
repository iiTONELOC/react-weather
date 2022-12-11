import ErrorBoundary from '.';
import styles from './styles';
import type { State } from './interfaces';


export function DisplayError(errorState: State, self: ErrorBoundary): JSX.Element { // NOSONAR

    const renderStack = (stack: string) => {
        const stackLines = stack.split('\n');

        const temp = stackLines.map((line, index): JSX.Element | undefined => {
            if (line !== '' && line !== ' ') {

                return (<p className={styles.descriptionText} key={index}>{line}</p>);
            }
            return undefined;
        });

        return temp.filter(line => line !== undefined);
    };

    function renderControlButtons(): JSX.Element[] {
        const btnData = [
            { label: 'Clear Error and Continue', onClick: self.clearError },
            { label: 'Clear Error and Reload', onClick: self.clearErrorAndReload }
        ];

        return btnData.map((btn, index) => <button
            key={index}
            onClick={() => btn.onClick(self)}
            className={styles.controlButton}
        >
            {btn.label}
        </button>
        );
    }

    return (
        <section className={styles.boundaryContainer}>
            <div className={styles.boundaryContent}>
                <h1 className={styles.heading}>Something went wrong!</h1>

                {process.env.NODE_ENV !== 'production' && (
                    <div className={styles.description}>
                        <h2>
                            <strong>Error:</strong><em> {errorState.error?.message}</em>
                        </h2>
                        <h3>
                            <strong>Stack trace:</strong>
                        </h3>
                        {
                            errorState.errorInfo?.componentStack ?
                                renderStack(errorState.errorInfo?.componentStack) :
                                'No stack trace available'
                        }
                    </div>
                )}
                <div className={styles.controlBtnContainer}>
                    {renderControlButtons()}
                </div>
            </div>
        </section >
    );
}
