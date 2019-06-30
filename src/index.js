import * as React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from 'redux';
import {createApi} from './api';
import thunk from 'redux-thunk';
import {compose} from 'recompose';
import {Router} from 'react-router-dom';

import {history} from './history';
import {Operation as UserOperation} from './reducers/user/user';
import App from './components/app/app.jsx';
import {reducer} from './reducers/reducer';
import {ActionCreator as UserActionCreator} from './reducers/user/user';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const init = () => {
  const api = createApi(() => {
    history.push(`/login`);
    store.dispatch(UserActionCreator.setIsAuthorized(false));
    store.dispatch(UserActionCreator.setUserData(null));
  });

  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : (a) => a
      )
  );

  store.dispatch(UserOperation.checkAuthorization());

  ReactDOM.render(
      <Provider store={store}>
        <Router history={history}>
          <ToastContainer />
          <App />
        </Router>
      </Provider>,
      document.querySelector(`#root`));
};

init();
