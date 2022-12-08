import { IApiResponse } from './APIs/interfaces';
import { IWeather } from './APIs/weather/interfaces';

export default function suspender(promise: Promise<IApiResponse<IWeather>>) {
    let status = 'pending';
    let response: IApiResponse<IWeather>;


    const _suspend: Promise<void> = promise.then(
        res => {
            status = 'success';
            response = res;
        },
        err => {
            status = 'error';
            response = err;
        }
    );

    const read = (): IApiResponse<IWeather> => {
        switch (status) {
            case 'pending':
                throw _suspend;
            case 'error':
                throw response;
            default:
                return response;
        }
    };

    return { read };
}
