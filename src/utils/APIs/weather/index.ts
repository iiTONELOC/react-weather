import { LocationAPI } from '../..';
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
        const { full } = props;
        let { lat, lon } = props;

        // CHECK LOCATION
        // if a lat and lon are not provided, get the user's location
        if (!lat || !lon) {
            const coords: GeolocationCoordinates = await LocationAPI.getPosition();
            const { latitude, longitude } = coords;

            // these could be 0 if there was an error getting the user's location
            // we leave them at zero because we don't want to use the default
            // provided by the API.
            lat = latitude;
            lon = longitude;
        }

        // fetch and return the weather data
        return new Promise(async resolve => {
            // build the URL
            const URL = this.API_URL
                // current doesn't provide the hourly, minutely, and daily data
                // while current-full does
                + (full ? 'current-full' : 'current')
                + (lat && lon ? `?lat=${lat}&lon=${lon}` : '');

            const token = this.API_KEY;

            // ensures we have a valid URL and API key
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

                // builds the response object, ensures we have data
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

                // return the response
                resolve(response);
            } else {
                // If we made it this far the key is invalid
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
