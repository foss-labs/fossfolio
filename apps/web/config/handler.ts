import Axios from 'axios';
import { ENV } from './ENV';

export const apiHandler = Axios.create({
    baseURL: ENV.api_base + '/api',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

apiHandler.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            originalRequest.url === ENV.api_base + '/auth/refresh'
            // redirecting when the refresh call fails
        ) {
            window.location.href = '/';
            return Promise.reject(error);
        }

        if (
            error.response.data.code === 'token_not_valid' &&
            error.response.status === 401 &&
            error.response.statusText === 'Unauthorized'
        ) {
            const refreshToken = localStorage.getItem('refresh_token');

            if (refreshToken) {
                const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

                // exp date in token is expressed in seconds, while now() returns milliseconds:
                const now = Math.ceil(Date.now() / 1000);
                // console.log(tokenParts.exp);

                if (tokenParts.exp > now) {
                    return apiHandler
                        .post('/auth/refresh', { refresh: refreshToken })
                        .then((response) => {
                            // console.log(response)
                            localStorage.setItem('access_token', response.data.access);
                            localStorage.setItem('refresh_token', response.data.refresh);

                            apiHandler.defaults.headers['Authorization'] =
                                'Bearer ' + response.data.access;
                            originalRequest.headers['Authorization'] =
                                'Bearer ' + response.data.access;

                            return apiHandler(originalRequest);
                        })
                        .catch((err) => {
                            // console.log(err);
                        });
                } else {
                    // console.log('Refresh token is expired', tokenParts.exp, now);
                    window.location.href = '/';
                }
            } else {
                // console.log('Refresh token not available.');
                window.location.href = '/login';
            }
        }

        // specific error handling done elsewhere
        return Promise.reject(error);
    },
);
