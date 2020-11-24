import React from 'react';
import ReactDOM from 'react-dom';
// Redux and Redux-saga
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootSaga from './redux/sagas';
import rootReducer from './redux/reducers';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];


const logger = createLogger({
  collapsed: (getState, action) => action.type === 'settings/ETH_RATE_UPDATE',
});

if (process.env.NODE_ENV === 'development' && true) {
  middlewares.push(logger);
}

const store = createStore(rootReducer, compose(applyMiddleware(...middlewares)));

sagaMiddleware.run(rootSaga);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
