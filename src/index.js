import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {HashRouter} from 'react-router-dom';


import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import authReducer from './store/reducers/auth';
import taskReducer from './store/reducers/task';

//auto suffix for reducer^ 'authReducer' does not exist
//in auth.js reducer
const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
    <HashRouter basename="/timekeeper/">
      <App />
    </HashRouter>
  </Provider>
);

ReactDOM.render( app, document.getElementById('root'));
registerServiceWorker();
