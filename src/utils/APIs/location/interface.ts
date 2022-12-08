export interface ILocationAPI {
    getPosition: () => Promise<GeolocationCoordinates>;
}
