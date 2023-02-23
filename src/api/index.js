import axios from 'axios';
import Router from 'next/router';
import Session from '../session';

const ApiUrl = process.env.API_URL;

export const axiosConnection = axios.create({});

axiosConnection.interceptors.response.use((response) => response, (error) => {
  if (error?.response?.data?.name === 'TokenExpiredError') {
    return Router.push('/login');
  }

  return error?.response;
});

const isAuthenticated = Session.getAuth();

if (isAuthenticated) {
  const { token } = Session.get();

  axiosConnection.defaults.headers.Authorization = token;
}

const FetchApi = {
  get: (path, header) => axiosConnection.get(`${ApiUrl}${path}`, header || {}),
  post: (path, data, header) => axiosConnection.post(`${ApiUrl}${path}`, data, header || {}),
  put: (path, data, header) => axiosConnection.put(`${ApiUrl}${path}`, data, header || {}),
};

export default FetchApi;
