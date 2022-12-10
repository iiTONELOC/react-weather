import { WeatherIconMap, fileNameMap } from './data';


const styles = {
    container: 'w-full h-full flex flex-col items-center justify-center p-2',
    iconImage: 'w-24 h-24'
};

export type WeatherIconProps = {
    iconCode: string;
    iconStyle?: string;
};



function imageLoader(icon: string) {
    // gets the correct folder name from the fileNameMap
    const folder = fileNameMap[icon as keyof typeof fileNameMap];
    // gets the correct array of icons from the WeatherIconMap
    const availableChoices = WeatherIconMap[icon as keyof typeof WeatherIconMap];

    if (!availableChoices) {
        // icon wasn't found in the map, return the default icon
        // TODO: add mist icon /50n
        return `https://openweathermap.org/img/wn/${icon}.png`;
    }
    // picks a random icon from the array
    // make sure the random index is within the array's bounds
    const randomIndex = Math.floor(Math.random() * availableChoices?.length - 1 || 0);

    const randomChoice = availableChoices[randomIndex];


    // returns the full relative path to the icon
    return `${process.env.PUBLIC_URL}/icons/${folder}/${randomChoice}`;
}

export default function WeatherIcon(props: WeatherIconProps): JSX.Element | null { //NOSONAR
    const { iconCode, iconStyle } = props;
    const icon = imageLoader(iconCode);


    return (
        <div className='w-full h-min-content bg-black flex flex-column items-center justify-center'>
            <img
                className={iconStyle || styles.iconImage}
                src={icon} alt="weather icon" />
        </div>
    );
}
