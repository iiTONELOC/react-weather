import weatherCache from './cache';
import { IApiResponse } from '../interfaces';
import { IWeather, ICurrentWeatherProps, IWeatherCacheItem } from './interfaces';
import {
    handleLatLon, isCacheItemExpired, weatherFetcher, handleSetCache,
    handleGetItemFromPersistedCache
} from './helpers';


class WeatherAPI {
    private readonly API_KEY: string;
    private readonly API_URL: string;
    // in-memory and persisted cache
    protected _cache = weatherCache();

    constructor() {
        this.API_KEY = process.env.REACT_APP_WEATHER_KEY || '';
        this.API_URL = process.env.REACT_APP_WEATHER_URL || '';
    }

    public async getCurrentWeather(props: ICurrentWeatherProps):
        Promise<IApiResponse<IWeather>> {
        let { full, lat, lon } = props;

        // CHECK LOCATION
        const coords = await handleLatLon(lat, lon);

        lat = coords.lat;
        lon = coords.lon;

        // fetch and return the weather data
        return new Promise(async resolve => {
            // build the URL
            const URL = this.API_URL
                + (full ? 'current-full' : 'current')
                + (lat && lon ? `?lat=${lat}&lon=${lon}` : '');

            const token = this.API_KEY;
            const CACHE_KEY = `${lat},${lon}>${full ? 'full' : 'current'}`;
            const cachedData: IWeatherCacheItem | undefined = this._cache[CACHE_KEY]
                || handleGetItemFromPersistedCache(CACHE_KEY);
            // ensures we have a valid URL and API key

            if (URL && token !== '') {
                if (cachedData && !isCacheItemExpired(cachedData)) {
                    return resolve({
                        status: 304, data: cachedData.data.weatherData, error: null
                    });
                }

                // If we made it this far we need to fetch the data and add it to the cache

                // fetch the data
                const response: IApiResponse<IWeather> = await weatherFetcher(URL, token);

                // set the response in the cache, returns the updated cache and original response
                const { _response, cache } = handleSetCache(CACHE_KEY, response, this._cache);

                // update the cache
                this._cache = cache;

                // return the response
                return resolve(_response);
            } else {
                // If we made it this far the key is invalid
                return resolve({
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
