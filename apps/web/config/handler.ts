import Axios from 'axios';
import { ENV } from './ENV';

export const apiHandler = Axios.create({
    baseURL: ENV.api_base,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

apiHandler.interceptors.request.use(
    (response) => {
      return response;
    },
    (error) => {
      const request = error.config;
      if (
        error.response.status === 401 &&
        request.url === ENV.api_base + '/auth/refresh'
      ) {
        window.location.href = '/?authReq=true';
      } else if ((error.response.status = 401)) {
        return apiHandler
          .get('/auth/refresh')
          .then(() => {
            return apiHandler(request);
          })
          .catch((err) => {
            console.log(err);
            window.location.href = '/?authReq=true';
          });
      } else {
        return Promise.reject(error);
      }
    },
  );
  
 