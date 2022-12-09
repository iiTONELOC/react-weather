import { getUserLocation, locationNameFromLatLon } from './helpers';
import { ILocationAPI } from './interface';

const Location: ILocationAPI = {
    getPosition: getUserLocation,
    getLocationName: locationNameFromLatLon
};

export default Location;
