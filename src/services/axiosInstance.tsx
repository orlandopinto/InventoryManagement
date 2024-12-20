import axios, { AxiosHeaders } from 'axios';
import { _Headers, ACCOUNT_END_POINT, API_END_POINT } from '../utilities/Constants.d';
import { TokenResult } from '../interfaces/IAccount';

const axiosInstance = axios.create({
     baseURL: API_END_POINT.URL_BASE,
     headers: { 'Content-Type': 'application/json' }
});

axiosInstance.interceptors.request.use(
     function (config) {
          const token = localStorage.getItem('tokenResult');
          const tokenResult: TokenResult = JSON.parse(token as string) as TokenResult
          if (token) {
               config.headers.Authorization = `Bearer ${tokenResult.accessToken}`;
          }
          return config;
     },
     function (error) {
          // Handle the error
          return Promise.reject(error);
     }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
     (response) => response,
     async (error) => {
          const originalRequest = error.config;

          // If the error status is 401 and there is no originalRequest._retry flag,
          // it means the token has expired and we need to refresh it
          if (error.response.status === 401 && !originalRequest._retry) {
               originalRequest._retry = true;

               try {
                    const _token = localStorage.getItem('tokenResult');
                    const url = API_END_POINT.URL_BASE + ACCOUNT_END_POINT.URL + 'refresh';
                    const localhostUrl = 'https://localhost:4433/Account/api/refresh'

                    // console.log('         url: ' + url)
                    // console.log('localhostUrl: ' + localhostUrl)
                    // console.log('axiosInstance.interceptors.response.use ==> _token: ' + _token)

                    const headers: _Headers = {
                         'Content-Type': 'application/json'
                    };

                    axios({
                         url: url,
                         data: _token,
                         method: 'POST',
                         headers: headers as AxiosHeaders
                    })
                         .then(response => {
                              if (response.data !== undefined && response.data !== null) {
                                   localStorage.setItem('tokenResult', JSON.parse(response.data));
                                   console.log('data: ' + JSON.parse(response.data))
                              }
                         })
                         .catch(err => {
                              console.log('se produjo un error al realizar lo soliitud a la api: ' + error)
                         })

                    // Retry the original request with the new token
                    originalRequest.headers.Authorization = `Bearer ${_token}`;
                    return axios(originalRequest);
               } catch (error) {
                    // Handle refresh token error or redirect to login
                    console.log('se produjo un error en el interceptors: ' + error)
               }
          }

          return Promise.reject(error);
     }
);


export default axiosInstance