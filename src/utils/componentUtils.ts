export const formatTemperature = (temperature: number): string => `${temperature.toFixed(0)}°`;

export const calculateHeatIndex = (temperature: number, humidity: number): string => {
    // see https://www.wpc.ncep.noaa.gov/html/heatindex_equation.shtml

    let heatIndex = -1;
    // we can use the basic formula if the temperature is below 80 degrees;
    if (temperature < 80) {

        heatIndex = 0.5 * (temperature + 61.0 + ((temperature - 68.0) * 1.2) + (humidity * 0.094));
    } else {

        // we need to use the Rothfusz formula
        heatIndex =
            -42.379
            + (2.04901523 * temperature)
            + (10.14333127 * humidity) - (0.22475541 * temperature)
            * humidity
            - (6.83783 * Math.pow(10, -3)
                * Math.pow(temperature, 2) - 5.481717 * Math.pow(10, -2)
                * Math.pow(humidity, 2) + 1.22874 * Math.pow(10, -3) * Math.pow(temperature, 2) * humidity
                + 8.5282 * Math.pow(10, -4) * temperature * Math.pow(humidity, 2) - 1.99 * Math.pow(10, -6) * Math.pow(temperature, 2) * Math.pow(humidity, 2));
    }

    return formatTemperature(heatIndex);
};

export const metersToMiles = (meters: number): number => meters * 0.000621371;

export const formatWindDirection = (degrees: number): string => {
    const directions = [
        'N', 'NNE', 'NE', 'ENE', 'E', 'ESE',
        'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW',
        'WNw', 'NW', 'NNW', 'N'
    ];

    const index = Math.round(degrees / 22.5) % directions.length;

    return `${degrees.toFixed(0)}° ${directions[index]}`;
};

export const capitalizeWords = (text: string): string => {
    const words = text.split(' ');

    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};
