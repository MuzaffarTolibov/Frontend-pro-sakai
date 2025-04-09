const DOMAIN = 'https://fakestoreapi.in/api'
const AUTH_API = 'https://api.escuelajs.co/api/v1/'

interface IEnvironment {
    production: boolean
    key: string;
    domain: string;
    apiUrl: string;
    authApiUrl: string;
}

export const environment: IEnvironment = {
    production: false,
    key: '',
    domain: DOMAIN,
    apiUrl: DOMAIN,
    authApiUrl: AUTH_API
};
