import styles from './styles';
import { dataFormatter } from './data';
import WeatherIcon from '../WeatherIcon';
import { useState, useEffect } from 'react';
import LocationHeader from '../LocationHeader';
import {
    WeatherAPI, IApiResponse, IWeather, suspender,
    formatTemperature,
    calculateHeatIndex
} from '../../utils';
import { IDailyWeather } from '../../utils/APIs/weather/interfaces';





// fetch our weather data
const weatherData = suspender(WeatherAPI.getCurrentWeather({ full: true }));

export default function CurrentConditions(): JSX.Element | null { //NOSONAR
    const [isMounted, setIsMounted] = useState<null | boolean>(null);
    const resource: IApiResponse<IWeather> = weatherData.read();

    const { data } = resource;
    const { lat, lon, current, daily } = data || {} as IWeather;

    const { weather, temp, humidity, feels_like,
        dew_point, uvi, visibility, wind_speed, wind_deg,
        sunrise, sunset } = current || {} as IWeather;


    const { description, icon } = weather[0] || {} as IWeather;
    let today = daily ? daily[0] : {} as IWeather['daily'];
    // @ts-ignore
    const { rain } = today || {} as IDailyWeather;
    const iconSrc: string = icon || '';

    const statsToDisplay = {
        feels_like,
        heat_index: calculateHeatIndex(temp, humidity),
        humidity,
        dew_point,
        uvi,
        visibility,
        wind_speed,
        wind_deg,
        sunrise,
        sunset
    };

    const statsList = [...Object.entries(statsToDisplay)];

    // split the stats list into two arrays
    const statsList1 = statsList.slice(0, statsList.length / 2);
    const statsList2 = statsList.slice(statsList.length / 2);

    const listsToDisplay = [statsList1, statsList2];

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
            <div className={styles.iconContainer}>
                <LocationHeader lat={lat} lon={lon} />
                <WeatherIcon iconCode={iconSrc} iconStyle={styles.icon} />
                <p className={styles.description}>
                    {description}
                </p>

            </div>

            <div className={styles.conditionsContainer}>
                <span className={styles.tempRainSpan}>
                    <p className={styles.temperature}>
                        {formatTemperature(temp)}
                    </p>
                    <p className={styles.rain}>
                        Chance of rain: {rain || 0}%
                    </p>
                </span>


                <div className={styles.conditionListContainer}>
                    {listsToDisplay.map((list, index) => {
                        return (
                            <ul className={styles.conditionList} key={'list:' + index}>
                                {list.map(([key, value]) => {
                                    const { formatter, display } = dataFormatter[key as keyof typeof dataFormatter];

                                    return (
                                        <li className={styles.condition} key={key}>
                                            <p className={styles.conditionListItem}>
                                                {/* @ts-ignore */}
                                                {display}: {formatter(value)}
                                            </p>
                                        </li>
                                    );
                                })}
                            </ul>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
