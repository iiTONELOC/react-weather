import styles from './styles';
import Spinner from '../Spinner';
import { useEffect, useState } from 'react';
import SpinnerStyles from '../Spinner/styles';
import { useIsMounted, IsMountedType } from '../../hooks';

export default function Loading(): JSX.Element {
    const { isMounted }: IsMountedType = useIsMounted();
    const [spinnerColor, setSpinnerColor] = useState<string>(SpinnerStyles.greenText);

    const threeSecTimeout = () => setTimeout(() => {
        setSpinnerColor(SpinnerStyles.yellowText);
        sixSecTimeout();
    }, 3000);

    const sixSecTimeout = () => setTimeout(() => {
        setSpinnerColor(SpinnerStyles.orangeText);
        nineSecTimeout();
    }, 3000);

    const nineSecTimeout = () => setTimeout(() => {
        setSpinnerColor(SpinnerStyles.redText);
    }, 3000);

    const updateLoader = (): void => {
        if (isMounted) {
            threeSecTimeout();
        }
    };

    const clearTimeouts = (): void => {
        clearTimeout(threeSecTimeout());
        clearTimeout(sixSecTimeout());
        clearTimeout(nineSecTimeout());
    };

    useEffect(() => {
        isMounted && updateLoader();
        !isMounted && clearTimeouts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted]);

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>
                <span className={styles.spinnerSpan}>
                    Loading...
                    {<Spinner textColor={spinnerColor} />}
                </span>
            </h1>
        </div>
    );
}
