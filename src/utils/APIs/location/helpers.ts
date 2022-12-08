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
