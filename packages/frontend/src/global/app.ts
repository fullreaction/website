import axios from 'axios';
import { ROOT_URL } from '../utils/httpUtils';

export default async () => {
  /**
   * The code to be executed should be placed within a default function that is
   * exported by the global script. Ensure all of the code in the global script
   * is wrapped in the function() that is exported.
   */
  axios.interceptors.request.use(
    config => {
      config.headers['content-type'] = 'application/json';
      config.baseURL = ROOT_URL;
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      console.log(response);
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      console.error(error.response.data);
      return Promise.reject(error.response.data);
    },
  );
};
