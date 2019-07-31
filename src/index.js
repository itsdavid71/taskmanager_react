import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import reducer from './reducers';

const store = createStore(reducer, applyMiddleware(thunk));


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route exact path="/" component={App} />
        </BrowserRouter>
    </Provider>, 
document.getElementById('root'));




