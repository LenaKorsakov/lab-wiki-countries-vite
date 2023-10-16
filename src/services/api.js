import axios from 'axios';
import { ApiRoutes } from './api-routes';

const BACKEND_URL = 'https://ih-countries-api.herokuapp.com';
const REQUEST_TIMEOUT = 5000;

const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: REQUEST_TIMEOUT,
});

api.fetchCountries = async function () {
  try {
    const { data } = await api.get(ApiRoutes.Countries);
    return data;
  } catch (error) {
    console.log(error);
  }
};

api.fetchCountryByCode = async function (code) {
  try {
    const { data } = await api.get(`${ApiRoutes.Countries}/${code}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default api;
