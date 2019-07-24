import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {BrowserRouter, Route} from 'react-router-dom';

const store = createStore(function(state=[], action){
    if( action.type == 'ADD_TASK' ){
        return [
            ...state,
            action.data
        ];
    }else if( action.type == 'DELETE_TASK' ){
        const myState = [...state];

        myState.forEach((stateItem, stateKey)=>{
            if( stateItem.id == action.name ){
                myState.splice(stateKey, 1);
            }
        });

        return myState;
    } else if( action.type == 'SORT_TASK' ){
        const task = [...state];
        console.log(task);
        return task.sort();
    }

    return state;
});

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, 
document.getElementById('root'));

