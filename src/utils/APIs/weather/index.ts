import { IApiResponse } from '../interfaces';
import { IWeather, ICurrentWeatherProps } from './interfaces';


class WeatherAPI {
    private readonly API_KEY: string;
    private readonly API_URL: string;

    constructor() {
        this.API_KEY = process.env.REACT_APP_WEATHER_KEY || '';
        this.API_URL = process.env.REACT_APP_WEATHER_URL || '';
    }

    public async getCurrentWeather(props: ICurrentWeatherProps):
        Promise<IApiResponse<IWeather>> {
        return new Promise(async resolve => {
            const { full, lat, lon } = props;

            // build the URL
            const URL = this.API_URL
                // current doesn't provide the hourly, minutely, and daily data
                // while current-full does
                + (full ? 'current-full' : 'current')
                + (lat && lon ? `?lat=${lat}&lon=${lon}` : '');

            const token = this.API_KEY;

            if (URL && token !== '') {
                const data = await fetch(URL, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(json => json)
                    .catch(_ => null);


                const response = data ?
                    { data: data.data, status: data.statusCode, error: null } :
                    {
                        status: 500, data: null, error: {
                            message:
                                'Error fetching weather data'
                        }
                    };

                // TESTING ONLY SET A TIMEOUT FOR  SECONDS before resolving
                // setTimeout(() => resolve(response), 10000);

                resolve(response);
            } else {
                resolve({
                    status: 401, data: null, error: {
                        message:
                            'Invalid API Key!'
                    }
                });
            }
        });
    }
}

export default new WeatherAPI();
