export interface IApiResponse<T> {
    status: number;
    data: T | null;
    error: { message: string } | null;
};
