import { IApiResponse } from "../interfaces";
import { ILocationName } from "../weather/interfaces";

export interface ILocationAPI {
    getPosition: () => Promise<GeolocationCoordinates>;
    getLocationName: (lat: number, lon: number) => Promise<IApiResponse<ILocationName>>;
}
