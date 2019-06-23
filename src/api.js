import axios from "axios";

export const BASE_URL = `https://es31-server.appspot.com/six-cities`;
const TIME_OUT = 5000;

export const createApi = (onFailCallback) => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    withCredentials: true
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    if (err.response.status === 403) {
      onFailCallback();
    }
    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
