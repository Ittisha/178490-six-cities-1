const initialState = {
  isAuthorized: false,
  isAuthorizationRequired: false,
  user: {
    id: null,
    email: ``,
    name: ``,
    avatarUrl: ``,
    isPro: false,
  },
};


const ActionType = {
  AUTHORIZE: `AUTHORIZE`,
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
};

const ActionCreator = {
  authorize: (user) => {
    return {
      type: ActionType.AUTHORIZE,
      payload: user,
    };
  },

  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
};


const Operation = {
  checkAuthorization: () => (dispatch, _getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreator.authorize(response.data));
        }
        return dispatch(ActionCreator.authorize(response.data));
      })
      .catch((err) => {
        throw err;
      });
  },

  logIn: (data) => (dispatch, _getState, api) => {
    return api.post(`/login`, data)
      .then((response) => {
        dispatch(ActionCreator.logIn(response.data));
        dispatch(ActionCreator.requireAuthorization(false));
      })
      .catch((err) => {
        throw err;
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_USER: return Object.assign({}, state, {
      user: {
        id: action.payload.id,
        email: action.payload.email,
        name: action.payload.name,
        avatarUrl: action.payload.avatar_url,
        isPro: action.payload.is_pro,
      }
    });

    case ActionType.CHECK_AUTHORIZATION: return Object.assign({}, state, {
      isAuthorized: action.payload,
    });

    case ActionType.LOG_IN: return Object.assign({}, state, {
      user: {
        id: action.payload.id,
        email: action.payload.email,
        name: action.payload.name,
        avatarUrl: action.payload.avatar_url,
        isPro: action.payload.is_pro,
      }
    });

    case ActionType.REQUIRED_AUTHORIZATION: return Object.assign({}, state, {
      isAuthorizationRequired: action.payload,
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
