export { default as suspender } from './suspender';
export { default as WeatherAPI } from './APIs/weather/';
export { default as LocationAPI } from './APIs/location/';


// export component utils
export {
    formatTemperature,
    calculateHeatIndex,
    formatWindDirection,
    metersToMiles
} from './componentUtils';




// export the interfaces

export type { IApiResponse } from './APIs/interfaces';
export type { IWeather } from './APIs/weather/interfaces';
export type { ILocationAPI } from './APIs/location/interface';
export type { ILocationName } from './APIs/weather/interfaces';


