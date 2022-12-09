import { ILocationHeaderProps } from '.';
import { ILocationName } from '../../utils';


export const getAddressFromStorage = (props: ILocationHeaderProps): string => {
    const key = `${props.lat},${props.lon}`;
    const addressData: string | null = localStorage.getItem('addressData');

    let address = 'City not found, State not found';

    if (addressData) {
        const data = JSON.parse(addressData);
        const _address: ILocationName = data[key];

        if (_address) {
            const { city, state, town, county } = _address;

            const _city = city || town || county || 'City not found';
            const _state = state || 'State not found';

            address = `${_city}, ${_state}`;
        }
    }

    return address;;
};


export const formatCurrentTime = (): string => {
    const current = new Date(Date.now()).toString();
    // split the string into an array
    const [day, month, date, year, time] = current.split(' ');

    // get the hour and min from the time string
    const [hour, minute] = time.split(':');

    // return the formatted time
    return `${hour}:${minute}`;
};
