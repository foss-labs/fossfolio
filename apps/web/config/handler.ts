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

let isRefreshing = false;
let refreshQueue: (() => void)[] = [];

apiHandler.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error: AxiosError) => {
        if (
            error.response?.status === 401 &&
            error.request.responseURL !== ENV.api_base + '/auth/refresh'
        ) {
            if (!isRefreshing) {
                try {
                    isRefreshing = true;
                    // new tokens are stored directly to cookies
                    await apiHandler.get('/auth/refresh');
                    /*
                       IF  access token was missing and this function get 200 response it should return
                       to the route where the interceptor was called from
                       NOTE - Right now will will only return to /org irrespective of where the api was called
                       // This need to be fixed
                    */
                    window.location.href = ENV.web_base_url + '/org';
                } catch (refreshError) {
                    isRefreshing = false;
                    throw { isTokenRefreshError: true };
                } finally {
                    isRefreshing = false;
                }

                // Replay the queued requests
                refreshQueue.forEach((resolve) => resolve());
                refreshQueue = [];
            }

            // Create a promise to retry the original request after the token is refreshed
            const retryOriginalRequest = new Promise((resolve) => {
                refreshQueue.push(() => resolve(apiHandler(error.request)));
            });

            return retryOriginalRequest;
        } else {
            // this will return to the function that made this interceptor to call
            // error should be handle from the catch block of that function
            return Promise.reject(error);
        }
    },
);
