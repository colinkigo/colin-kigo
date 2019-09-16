import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './containers/App';
import reducers from './reducers'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import promise from 'redux-promise-middleware'
import thunk from 'redux-thunk'

// let middleware = applyMiddleware(promise, thunk)
let middleware = applyMiddleware(promise, thunk, logger)

const store = createStore(reducers, middleware)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('.root')
);