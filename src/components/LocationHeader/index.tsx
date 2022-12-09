import styles from './styles';
import { useEffect, useState } from 'react';
import { useIsMounted, IsMountedType } from '../../hooks';
import { formatCurrentTime, getAddressFromStorage } from './helpers';


export interface ILocationHeaderProps {
    lat: number;
    lon: number;
};

// Displays the current location and time
// expects {lat, lon} as props
export default function LocationHeader(props: ILocationHeaderProps): JSX.Element {
    const [time, setTime] = useState<string>(formatCurrentTime());
    const { isMounted }: IsMountedType = useIsMounted();

    // updates the time every interval seconds
    const clockUpdater = (interval: number): NodeJS.Timeout => setInterval(
        () => setTime(formatCurrentTime()), interval);

    useEffect(() => {
        // hold our interval so we can clear it when the component unmounts
        let interval: NodeJS.Timeout | null = null;

        if (isMounted) {
            // componentDidMount update the timer
            interval = clockUpdater(5000); // NOSONAR
        } else {
            // componentWillUnmount clear the timer
            if (interval) {
                clearInterval(interval);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted]);

    return (
        <div className={styles.container}>
            <span className={styles.city}>
                {getAddressFromStorage({ lat: props.lat, lon: props.lon })}
            </span>

            <p className={styles.time}> {time}</p>
        </div>
    );
}
