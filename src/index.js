import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const store = createStore(function(state=[], action){
    if( action.type == 'ADD_TASK' ){
        return [
            ...state,
            action.data
        ];
    }else if( action.type == 'DELETE_TASK' ){
        const myState = [...state];
        console.log(myState);

        myState.forEach((stateItem, stateKey)=>{
            if( stateItem == action.name ){
                myState.splice(stateKey, 1);
            }
        });

        return myState;
    }

    return state;
});

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, 
document.getElementById('root'));

