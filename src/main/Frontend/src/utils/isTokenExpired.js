import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token) => {
    if (!token) return true;

    const { exp } = jwtDecode(token);
    if (!exp) return true;

    const currentTime = Date.now() / 1000;
    return exp < currentTime;
};

export default isTokenExpired;