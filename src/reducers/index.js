import {combineReducers} from 'redux';
import taskTypes from './taskTypes';
import tasks from './tasks';

export default combineReducers({
    taskTypes,
    tasks
});