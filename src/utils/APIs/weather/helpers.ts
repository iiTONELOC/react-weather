import { LocationAPI, IApiResponse } from '../..';
import { IWeatherCacheItem, IWeather, IWeatherCache } from './interfaces';


// Returns lat and lon if they exist
// else, it gets the lat and lon from the user's location
export const handleLatLon = async (lat?: number, lon?: number):
    Promise<{ lat: number, lon: number, city?: string, state?: string }> => {
    if (!lat || !lon) {
        const coords: GeolocationCoordinates = await LocationAPI.getPosition();
        const { latitude, longitude } = coords;

        // these could be 0 if there was an error getting the user's location
        // we leave them at zero because we don't want to use the default
        // provided by the API.
        lat = latitude;
        lon = longitude;
    }

    // we need to find the city name from the lat and lon
    const cityData = await LocationAPI.getLocationName(lat, lon);

    const { data } = cityData;

    if (data) {
        const { city, state, town, county } = data;
        return {
            lat,
            lon,
            city: city || town || county || "City not found",
            state: state || "State not found"
        };
    }

    return {
        lat,
        lon,
    }
};



// check if the cache item is expired
export const isCacheItemExpired = (item: IWeatherCacheItem): boolean => {
    const { expiresAt } = item.data;
    return Date.now() > expiresAt;
};

// fetches the data from the weather API and returns the response
export const weatherFetcher = async (URL: string, token: string):
    Promise<IApiResponse<IWeather>> => {

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

    return response;
};


// creates the cache entry and updates the persisted and in-memory cache
export const handleSetCache = (
    key: string,
    response: IApiResponse<IWeather>,
    cache: IWeatherCache)
    : {
        _response: IApiResponse<IWeather>,
        cache: IWeatherCache
    } => {

    const TEN_MIN_IN_MILI = 1000 * 60 * 10; //

    if (response.status === 200 || 304) {
        // add the data to the cache
        response.data && (cache = {
            ...cache,
            [key]: {
                id: key,
                data: {
                    weatherData: response.data,
                    expiresAt: Date.now() + TEN_MIN_IN_MILI,
                    createdAt: Date.now()
                }
            }
        });

        //update the persisted cache
        localStorage.setItem('weatherCache', JSON.stringify(cache));
    }

    return {
        _response: response,
        cache
    };
};

// attempts to get the data from the local storage cache
export const handleGetItemFromPersistedCache = (cacheKey: string) => {
    const cache = localStorage.getItem('weatherCache');
    const parsedCache = cache ? JSON.parse(cache) : null;
    if (!parsedCache) {
        return null;
    }
    const cachedData = parsedCache[cacheKey];
    return cachedData;
};
