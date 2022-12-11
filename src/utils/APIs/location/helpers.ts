import { IApiResponse } from '../..';
import { ILocationName } from '../weather/interfaces';

export const fetchLocationBrowserAPI = async (): Promise<GeolocationPosition | null> => {
    return new Promise((resolve, reject) => {
        try {
            navigator.geolocation.getCurrentPosition(
                position => {
                    resolve(position);
                },
                error => {
                    reject(error);
                }
            );
        } catch (error) {
            console.log('USER DENIED LOCATION ACCESS', error);
            reject(error);
        }
    });
};

export const fetchIp = async (): Promise<string | null> => {
    try {
        const response = await fetch('https://myexternalip.com/json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.log('Error fetching IP', error);
        return null;
    }
};


export const fetchGeoFromIp = async (ip: string): Promise<{ latitude: number, longitude: number } | null> => {
    try {
        const response = await fetch(`https://ipapi.co/${ip}/json/`);
        const data = await response.json();

        return { latitude: data.latitude, longitude: data.longitude };
    } catch (error) {
        console.log('Error fetching Geo from IP', error);
        return null;
    }
};


export async function getUserLocation() {
    const userLocation = await fetchLocationBrowserAPI().catch(async _ => {
        const IP = await fetchIp();

        if (IP) {
            const geo = await fetchGeoFromIp(IP);
            if (geo) {
                return {
                    coords:
                        { latitude: geo.latitude, longitude: geo.longitude }
                } as GeolocationPosition;
            }
            else {
                alert('Error getting your location. Please enable location services.');
            }
        }
        else {
            alert('Please enable location access or allow us to use your IP address to get your location');
        }

        return null;
    });

    const { coords } = userLocation || {
        coords: {
            latitude: 0, longitude: 0
        }
    } as GeolocationPosition;

    return coords;
}

export const locationNameFromLatLon = async (lat: number, lon: number):
    Promise<IApiResponse<ILocationName>> => {
    try {
        const URL = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
        const key = `${lat.toFixed(4)},${lon.toFixed(4)}`;
        // look in local storage for the address data before making the API call
        const addressData = localStorage.getItem('addressData');
        if (addressData) {
            // look for the address data in local storage
            const data = JSON.parse(addressData);
            const address = data[key];

            // we found the address data in local storage so we return it
            if (address) {
                return {
                    status: 304,
                    data: {
                        city: address?.city,
                        state: address.state,
                        town: address?.town,
                        county: address?.county
                    },
                    error: null
                };
            }
        }

        // address data was not found in local storage so we make the API call

        const response = await fetch(URL);
        const data = await response.json();

        // extract the address data from the response
        const { address } = data;

        // save the address data in local storage
        if (addressData) {
            const data = JSON.parse(addressData);
            data[key] = address;
            localStorage.setItem('addressData', JSON.stringify(data));
        } else {

            // does not exist in local storage so we create it
            const data = Object.create({});
            data[key] = address;
            localStorage.setItem('addressData', JSON.stringify(data));
        }


        // return the address data
        return {
            status: 200,
            data: address,
            error: null
        };
    } catch (error) {
        return {
            status: 500,
            data: null,
            error: {
                message: 'Error getting location name from lat and lon'
            }
        };
    }
}
