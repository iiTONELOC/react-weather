import { IWeatherCache } from './interfaces';

const weatherCache = () => {
    // create the cache
    const cache: IWeatherCache = Object.create({});

    // look for an existing cache in local storage
    const existing = localStorage.getItem('weatherCache');

    // parse the existing cache or create a new one
    const parsed = existing ? JSON.parse(existing) : cache;

    // set the cache in local storage
    parsed && localStorage.setItem('weatherCache', JSON.stringify(parsed));

    // return the cache
    return parsed;
};

export default weatherCache;
