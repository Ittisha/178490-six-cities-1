import {toast} from 'react-toastify';
import {mapUser} from '../../mappers/map-user';
import {SUCCESS_STATUS} from '../../consts';

const initialState = {
  isAuthorized: false,
  isLoading: false,
  user: null,
  error: null,
};


const ActionType = {
  SET_USER_DATA: `SET_USER_DATA`,
  SET_IS_AUTHORIZED: `SET_IS_AUTHORIZED`,
  SET_IS_AUTHORIZATION_CHECKED: `SET_IS_AUTHORIZATION_CHECKED`,
};

const ActionCreator = {
  setUserData: (user) => {
    return {
      type: ActionType.SET_USER_DATA,
      payload: user,
    };
  },

  setIsAuthorized: (status) => {
    return {
      type: ActionType.SET_IS_AUTHORIZED,
      payload: status,
    };
  }
};


const Operation = {
  checkAuthorization: () => (dispatch, _getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        if (response.status === SUCCESS_STATUS) {
          const userData = mapUser(response.data);
          dispatch(ActionCreator.setIsAuthorized(true));
          dispatch(ActionCreator.setUserData(userData));
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  },

  logIn: (data) => (dispatch, _getState, api) => {
    return api.post(`/login`, data)
      .then((response) => {
        if (response.status === SUCCESS_STATUS) {
          const userData = mapUser(response.data);
          dispatch(ActionCreator.setUserData(userData));
          dispatch(ActionCreator.setIsAuthorized(true));
          toast.success(`You are logged as ${userData.name}`);
          return;
        }
        toast.error(response.response.data.error);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_USER_DATA: return Object.assign({}, state, {
      user: action.payload,
    });

    case ActionType.SET_IS_AUTHORIZED: return Object.assign({}, state, {
      isAuthorized: action.payload,
    });
  }

  return state;
};

export {
  ActionCreator,
  ActionType,
  Operation,
  reducer,
};
