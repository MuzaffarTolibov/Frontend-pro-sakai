const DOMAIN = 'https://fakestoreapi.in/api'

interface IEnvironment {
    production: boolean
    key: string;
    domain: string;
    apiUrl: string;
}

export const environment: IEnvironment = {
    production: false,
    key: '',
    domain: DOMAIN,
    apiUrl: DOMAIN,
};
