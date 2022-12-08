import { useState, useEffect } from 'react';
import { WeatherAPI, IApiResponse, IWeather, suspender } from '../../utils';


// fetch our weather data
const weatherData = suspender(WeatherAPI.getCurrentWeather({ full: true }));

export default function CurrentConditions(): JSX.Element {
    const [isMounted, setIsMounted] = useState<null | boolean>(null);
    const resource: IApiResponse<IWeather> = weatherData.read();

    useEffect(() => {
        setIsMounted(true);

        return () => setIsMounted(false);
    }, []);

    useEffect(() => {
        if (isMounted) {
            console.log(resource);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted]);
    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                Current Conditions
            </h1>
            <p className="text-xl font-bold">

            </p>
        </div>
    );
}
