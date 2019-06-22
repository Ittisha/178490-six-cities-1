import axios from "axios";
import {ActionCreator} from "./reducers/user/user";

const TIME_OUT = 5000;

export const createApi = (dispatch) => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/six-cities`,
    timeout: TIME_OUT,
    withCredentials: true
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    if (err.response.status === 403) {
      dispatch(ActionCreator.requireAuthorizationStatus(true));
    }
    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
