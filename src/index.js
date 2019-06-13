import * as React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from 'redux';
import {createApi} from './api';
import {Operation} from './reducers/offers/offers-data';
import thunk from 'redux-thunk';
import {compose} from 'recompose';


import App from './components/app/app.jsx';
import {reducer} from './reducers/reducer';

const init = () => {
  const api = createApi((...args) => store.dispatch(...args));
  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : (a) => a
      )
  );

  store.dispatch(Operation.loadOffers());

  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.querySelector(`#root`));
};

init();
