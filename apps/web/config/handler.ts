import Axios from 'axios';
import type { AxiosError, AxiosResponse } from 'axios';
import { ENV } from './ENV';

export const apiHandler = Axios.create({
    baseURL: ENV.api_base,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

apiHandler.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error: AxiosError) => {
        const request = error.config;

        if (error.response?.status === 400 && request?.url === '/auth/refresh') {
            console.error('UnAuthorzed User, Forwarding user to Login Page');
            return;
        } else if (error.response?.status === 401) {
            const refreshTokenResponse = await apiHandler.get('/auth/refresh');
            return apiHandler(refreshTokenResponse.request);
        } else {
            return Promise.reject(error);
        }
    },
);
