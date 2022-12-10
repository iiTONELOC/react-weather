import { formatTemperature, metersToMiles, calculateHeatIndex, formatWindDirection } from '../../utils';

export const dataFormatter = {
    'feels_like': {
        display: 'Feels Like',
        formatter: (temp: number): string => formatTemperature(temp),
        value: 'feels_like'
    },
    'humidity': {
        display: 'Humidity',
        formatter: (value: number): string => `${value}%`,
        value: 'humidity'
    },
    'dew_point': {
        display: 'Dew Point',
        formatter: (temp: number): string => formatTemperature(temp),
        value: 'dew_point'
    },
    'heat_index': {
        display: 'Heat Index',
        formatter: (val: string) => val,
        value: 'heat_index'
    },
    'uvi': {
        display: 'UV Index',
        formatter: (value: number): string => value.toFixed(0),
        value: 'uvi'
    },
    'pressure': {
        display: 'Pressure',
        formatter: (value: number): string => `${value.toFixed(0)} mb`,
        value: 'pressure'
    },
    'visibility': {
        display: 'Visibility',
        formatter: (value: number): string => `${metersToMiles(value).toFixed(1)} mi`,
        value: 'visibility'
    },
    'clouds': {
        display: 'Clouds',
        formatter: (value: number): string => `${value}%`,
        value: 'clouds'
    },
    'wind_speed': {
        display: 'Wind Speed',
        formatter: (value: number): string => `${value.toFixed(0)} mph`,
        value: 'wind_speed'
    },
    'wind_deg': {
        display: 'Wind Dir',
        formatter: formatWindDirection,
        value: 'wind_deg'
    },
    'wind_gust': {
        display: 'Wind Gust',
        formatter: (value: number): string => `${value.toFixed(0)} mph`,
        value: 'wind_gust'
    },
    'sunrise': {
        display: 'Sunrise',
        formatter: (value: number): string => new Date(value * 1000).toLocaleTimeString(),
        value: 'sunrise'
    },
    'sunset': {
        display: 'Sunset',
        formatter: (value: number): string => new Date(value * 1000).toLocaleTimeString(),
        value: 'sunset'
    }
};

