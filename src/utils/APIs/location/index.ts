import { getUserLocation } from './helpers';
import { ILocationAPI } from './interface';

const Location: ILocationAPI = {
    getPosition: getUserLocation
};

export default Location;
