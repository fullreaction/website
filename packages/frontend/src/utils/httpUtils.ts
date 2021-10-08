import { Axios, AxiosRequestConfig, AxiosResponse } from 'axios';

class AxiosServiceController extends Axios {
  constructor() {
    super({ baseURL: 'http://localhost:3000/' });
    this.initInterceptors();
  }
  private initInterceptors() {
    this.interceptors.request.use(this.contentTypeInterceptor);
  }
  // add interceptor functions and initInterceptors()
  // when we need them

  private contentTypeInterceptor(config: AxiosRequestConfig) {
    if (typeof config.data == 'string') config.headers = { 'content-type': 'application/json' };
    else if (config.data instanceof FormData) config.headers = { 'content-type': 'multipart/form-data' };
    // Add more as needed, might change the ifs with a switch

    return config;
  }
  public handleFetch(response: AxiosResponse<string>) {
    if (response.status == 200 || response.status == 201) {
      return JSON.parse(response.data);
    } else throw response;
  }
}

export const ROOT_URL = 'http://localhost:3000/';

export const handleFetch = async response => {
  if (!response.ok)
    return response.json().then(response => {
      throw response;
    });

  return await response.json();
};

type gvmInnerError = {
  code: string;
  innerError: gvmInnerError;
};

type gvmError = {
  code: string;
  message: string;
  target?: string;
  details?: gvmError[] | null;
  innerError?: gvmInnerError | null;
};

//needs to be console.loggable
export class gvmHttpErrorResponse {
  constructor(public error: gvmError, public code: number, public message: string, public url: string) {}
}

export const AxiosService = new AxiosServiceController();
