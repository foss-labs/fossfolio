import Axios from "axios";
import type { AxiosError, AxiosResponse } from "axios";
import { ENV } from "./ENV";

export const apiHandler = Axios.create({
  baseURL: ENV.api_base,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
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
      error.request.responseURL !== ENV.api_base + "/auth/refresh"
    ) {
      const originalRequestURL = window.location.href;
      // Create a promise to retry the original request after the token is refreshed
      const retryOriginalRequest = new Promise((resolve) => {
        refreshQueue.push(() => resolve(apiHandler(error.request)));
      });
      if (!isRefreshing) {
        try {
          isRefreshing = true;
          // new tokens are stored directly to cookies
          await apiHandler.get("/auth/refresh");
          window.location.href = originalRequestURL;
        } catch (refreshError) {
          isRefreshing = false;
          throw new Error();
        } finally {
          isRefreshing = false;
        }

        // Replay the queued requests
        refreshQueue.forEach((resolve) => resolve());
        refreshQueue = [];
      }

      return retryOriginalRequest;
    } else {
      // this will return to the function that made this interceptor to call
      // error should be handle from the catch block of that function
      return Promise.reject(error);
    }
  }
);
