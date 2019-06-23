import {mapUser} from '../../mappers/map-user';

const initialState = {
  isAuthorized: false,
  user: null,
  error: null,
};


const ActionType = {
  SET_USER_DATA: `SET_USER_DATA`,
  SET_IS_AUTHORIZED: `SET_IS_AUTHORIZED`,
  SET_ERROR: `SET_ERROR`,
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
  },
  setError: (error) => {
    return {
      type: ActionType.SET_ERROR,
      payload: error,
    };
  }
};


const Operation = {
  checkAuthorization: () => (dispatch, _getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        const userData = mapUser(response.data);
        dispatch(ActionCreator.setUserData(userData));
        dispatch(ActionCreator.setIsAuthorized(true));
      })
      .catch((error) => {
        dispatch(ActionCreator.setError(error));
      });
  },

  logIn: (data) => (dispatch, _getState, api) => {
    return api.post(`/login`, data)
      .then((response) => {
        const userData = mapUser(response.data);
        dispatch(ActionCreator.setUserData(userData));
        dispatch(ActionCreator.setIsAuthorized(true));
      })
      .catch((error) => {
        dispatch(ActionCreator.setError(error));
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
