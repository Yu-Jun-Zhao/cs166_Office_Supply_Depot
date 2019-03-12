import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import App from './App'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import rootReducer from './rootReducer'

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

/* global document */
/* eslint-disable react/jsx-filename-extension */
ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'))
registerServiceWorker();
