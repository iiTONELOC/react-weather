export interface IWeather {
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

export interface ICurrentWeatherProps {
    full?: boolean
    lat?: number
    lon?: number
}
