import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDefaultConfig from './config';
import { handleApiError } from './handleApi/handleErrors';
import { handleApiResponse } from './handleApi/handleResponse';
export default class JwtService {
  jwtConfig = { ...jwtDefaultConfig };
  isAlreadyFetchingAccessToken = false;
  jwtOverrideConfig;

  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig };
    this.jwtOverrideConfig = jwtOverrideConfig;

    axios.interceptors.request.use(
      (config) => {
        const accessToken = Cookies.get(this.jwtConfig.storageTokenKeyName);

        if (this.jwtOverrideConfig && Array.isArray(this.jwtOverrideConfig)) {
          this.jwtOverrideConfig.forEach((header) => {
            const headerName = Object.keys(header)[0];
            const headerValue = Object.values(header)[0];
            config.headers[headerName] = headerValue;
          });
        }

        config.headers.Accept = 'application/json';
        if (accessToken) {
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      async function (response) {
        const handledResponse = await handleApiResponse(response);
        return handledResponse;
      },
      async function (error) {
        const handledError = await handleApiError(error, jwtOverrideConfig.router);
        return handledError;
      }
    );
  }

  companyTestApi() {
    return axios.get(this.jwtConfig.companyTestEndPoint);
  }
}
