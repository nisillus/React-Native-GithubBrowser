import axios from 'axios';

import httpInterceptor from './api-interceptor.util';

const DEFAULT_CONFIG = {
  baseURL: 'https://fast-escarpment-11974.herokuapp.com/api/',
  timeout: 1000
};

export default class ApiClient {
  _axiosInstance;

  constructor() {
    this._axiosInstance = axios.create(DEFAULT_CONFIG);
    this._axiosInstance.interceptors.request.use(httpInterceptor);

    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
  }

  getDataFromResponse(response) {
    if (response.status < 200 || response.status >= 300) {
      throw new Error('Oops! Something went wrong!');
    }

    return response.data;
  }

  async get(url, config = {}) {
    try {
      const result = await this._axiosInstance.get(url, config);

      const resData = this.getDataFromResponse(result);

      return resData;
    } catch(err) {
      throw new Error(err);
    }
  }

  async post(url, data = {}, config = {}) {
    try {
      const result = await this._axiosInstance
        .post(url, data, config);

      const resData = this.getDataFromResponse(result);

      return resData;
    } catch(err) {
      throw new Error(err);
    }
  }
}