const DOMAIN = 'https://fakestoreapi.com/'

export interface IEnv {
    production: boolean,
    apiUrl: string;
}
export const environment: IEnv = {
    production: false,
    apiUrl: DOMAIN,
};
