import styles from './styles';
import CurrentTime from './CurrentTime';
import { getAddressFromStorage } from './helpers';


export interface ILocationHeaderProps {
    lat: number;
    lon: number;
};

// Displays the current location and time
// expects {lat, lon} as props
export default function LocationHeader(props: ILocationHeaderProps): JSX.Element {

    return (
        <div className={styles.container}>
            <span className={styles.city}>
                {getAddressFromStorage({ lat: props.lat, lon: props.lon })}
            </span>

            <p className={styles.time}> <CurrentTime /></p>
        </div>
    );
}
