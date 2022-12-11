import styles from './styles';
import WeatherIcon from '../WeatherIcon';
import LocationHeader from '../LocationHeader';
import {
    WeatherAPI, IApiResponse, IWeather, suspender,
    formatTemperature,
    calculateHeatIndex,
    capitalizeWords
} from '../../utils';
import { IDailyWeather } from '../../utils/APIs/weather/interfaces';

import { useIsLandscape } from '../../hooks';
import ConditionsList from './ConditionsList';
// fetch our weather data
const weatherData = suspender(WeatherAPI.getCurrentWeather({ full: true }));

export default function CurrentConditions(): JSX.Element { //NOSONAR
    const resource: IApiResponse<IWeather> = weatherData.read();
    const { data } = resource;

    const Styles = styles(useIsLandscape());

    // destructure the data object to get the values we need
    const { lat, lon, current, daily } = data || {} as IWeather;

    // get the values we need from the current object
    const {
        uvi,
        temp,
        sunset,
        weather,
        sunrise,
        humidity,
        wind_deg,
        dew_point,
        feels_like,
        visibility,
        wind_speed
    } = current || {} as IWeather;

    // get the current description and weather icon
    const { description, icon } = weather[0] || {} as IWeather;

    // gets the daily weather object for today so we can get the rain value
    const today = daily ? daily[0] : {} as IWeather['daily'];

    // @ts-ignore
    const { rain } = today || {} as IDailyWeather;

    // if the icon is null, set it to an empty string
    const iconSrc: string = icon || '';

    // create an object with the stats we want to display
    const statsToDisplay = {// NOSONAR
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

    // separate the stats object into an array of arrays
    const statsList: [string, (string | number)][] = [...Object.entries(statsToDisplay)];

    // split the stats list into two arrays
    const statsList1 = statsList.slice(0, statsList.length / 2);
    const statsList2 = statsList.slice(statsList.length / 2);

    // props for the current conditions list
    const listsToDisplay = [statsList1, statsList2];

    return (
        <div className={Styles.container}>
            <div className={Styles.iconContainer}>
                <LocationHeader lat={lat} lon={lon} />
                <WeatherIcon iconCode={iconSrc} iconStyle={Styles.icon} />
                <p className={Styles.description}>
                    {capitalizeWords(description)}
                </p>
            </div>

            <div className={Styles.conditionsContainer}>
                <span className={Styles.tempRainSpan}>
                    <p className={Styles.temperature}>
                        {formatTemperature(temp)}
                    </p>
                    <p className={Styles.rain}>
                        Chance of rain: {rain || 0}%
                    </p>
                </span>

                <div className={Styles.conditionListContainer}>
                    <ConditionsList data={listsToDisplay} />
                </div>
            </div>
        </div>
    );
}
