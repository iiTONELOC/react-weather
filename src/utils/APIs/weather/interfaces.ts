export interface IWeatherCondition {
    id: number,
    main: string,
    description: string,
    icon: string
};

export interface IMinutelyWeather {
    dt: number,
    precipitation: number
};

export interface IHourlyWeather {
    dt: number,
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number,
    dew_point: number,
    uvi: number,
    clouds: number,
    visibility: number,
    wind_speed: number,
    wind_deg: number,
    weather: IWeatherCondition[],
    pop: number
};

export interface IDailyTemperature {
    day: number,
    min: number,
    max: number,
    night: number,
    eve: number,
    morn: number
};

export interface IDailyFeelsLike {
    day: number,
    night: number,
    eve: number,
    morn: number
};

export interface IDailyWeather {
    dt: number,
    sunrise: number,
    sunset: number,
    moonrise: number,
    moonset: number,
    temp: IDailyTemperature,
    feels_like: IDailyFeelsLike,
    pressure: number,
    humidity: number,
    dew_point: number,
    wind_speed: number,
    wind_deg: number,
    weather: IWeatherCondition[],
    clouds: number,
    pop: number,
    uvi: number,
    rain: number
};

export interface ICurrentWeather {
    dt: number,
    sunrise: number,
    sunset: number,
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number,
    dew_point: number,
    uvi: number,
    clouds: number,
    visibility: number,
    wind_speed: number,
    wind_deg: number,
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: string
        }
    ],
    timestamp: number,
    alerts?: {
        sender_name: string,
        _event: string,
        start: number,
        end: number,
        description: string,
        tags: string[]
    }[]
};

export interface IWeatherAlert {
    sender_name: string,
    _event: string,
    start: number,
    end: number,
    description: string,
    tags: string[]
};

// USED BY THE WEATHER API
export interface IWeather {
    lat: number,
    lon: number,
    timezone: string,
    timezone_offset: number,
    current: ICurrentWeather,
    minutely?: IMinutelyWeather[],
    hourly?: IHourlyWeather[],
    daily?: IDailyWeather[],
    alerts?: IWeatherAlert[]
};

// WEATHER API PROPS
export interface ICurrentWeatherProps {
    full?: boolean
    lat?: number
    lon?: number
};

// WEATHER CACHE

export interface IWeatherCacheItem {
    id: string,
    data: {
        createdAt: number,
        expiresAt: number,
        weatherData: IWeather
    }
};

export interface IWeatherCache {
    [key: string]: IWeatherCacheItem
};

export interface ILocationName {
    city?: string,
    town?: string,
    county?: string,
    state: string,
}
