import styles from './styles';
import { useState, useEffect } from 'react';
import { WeatherAPI, IApiResponse, IWeather, suspender } from '../../utils';
import LocationHeader from '../LocationHeader';


// fetch our weather data
const weatherData = suspender(WeatherAPI.getCurrentWeather({ full: true }));

export default function CurrentConditions(): JSX.Element | null { //NOSONAR
    const [isMounted, setIsMounted] = useState<null | boolean>(null);
    const resource: IApiResponse<IWeather> = weatherData.read();

    const lat = resource?.data?.lat || 0;
    const lon = resource?.data?.lon || 0;

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    useEffect(() => {
        if (isMounted) {
            console.log(resource);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted]);
    return resource.data && (
        <div className={styles.container}>
            <LocationHeader lat={lat} lon={lon} />
            <p className="text-xl font-bold">

            </p>
        </div>
    );
}
