import { WeatherIconMap, fileNameMap } from './data';

const styles = {
    container: 'w-full h-min-content flex flex-column items-center justify-center mt-2',
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

    // icon wasn't found in the map, return the default icon
    if (!availableChoices || !folder) {
        console.log("COULDN'T FIND ICON", { icon, folder });
        // TODO: add mist icon /50n

        return `https://openweathermap.org/img/wn/${icon}.png`;
    } else {

        // picks a random icon from the array
        const randomIndex = Math.floor(Math.random() * availableChoices?.length || 0);
        const randomChoice = availableChoices[randomIndex];

        // returns the full relative path to the icon
        return `${process.env.PUBLIC_URL}/icons/${folder}/${randomChoice}`;
    }
}

export default function WeatherIcon(props: WeatherIconProps): JSX.Element | null { //NOSONAR
    const { iconCode, iconStyle } = props;


    return iconCode ? (
        <div className={styles.container}>
            <img
                className={iconStyle || styles.iconImage}
                src={imageLoader(iconCode)} alt="weather icon" />
        </div>
    ) : null;
}
