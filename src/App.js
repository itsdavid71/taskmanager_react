import React from 'react';
import {connect} from 'react-redux';
import {getTask} from './actions/tasks';
import {addTask} from './actions/addTask';
import {getType} from './actions/type';
import Type from './components/Type';
import AddTask from './components/AddTask';
import TaskType from './components/TaskType';
import "./scss/App.scss";
import Moment from 'react-moment';
import 'moment-timezone';
// import {CSSTransition} from 'react-transition-group';


class App extends React.Component{

    componentDidMount(){
        this.props.onLoadData();
    }
    
    render(){

        return(
            
            <div className="background popup-block popup-check">
                <div className="bg-black">
                    <div className="container">
                        <h1>Task Manager</h1>
                        <div className="flex">
                        <AddTask actionAddTask={(taskValue, deadline, date, priority)=> this.props.addTask(taskValue, deadline, date, this.props.tasks, priority)} taskTypes={this.props.taskTypes} />

                        { 
                            (this.props.id != 'none') ?  <Type typeInfo={typeItem}/>: 
                            <TaskType deleteThisTask={(id)=> this.props.deleteTask(id, this.props.tasks)} sortAllTasks={(date)=> this.props.sortTasks(date, this.props.tasks)} tasks={this.props.tasks} taskTypes={this.props.taskTypes}/> 
                        }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(
    (state, ownProps)=>
        {
            // console.log('OwnProps',ownProps);
            return{
                taskTypes:  state.taskTypes,
                tasks: state.tasks,
                path: (ownProps.match.params.filter != undefined) ? ownProps.match.params.filter : "/",
                id: (ownProps.match.params.id != undefined) ? ownProps.match.params.id : "none"
            }
    },
    dispatch=>({
        onLoadData: ()=>{
            dispatch(getType());
            dispatch(getTask());
        },
        addTask: (taskValue, deadline, date, state, priority)=>{
            dispatch(addTask(taskValue, deadline, date, priority, [...state]));
            dispatch({
                type: 'SORT_TASKS'
            })
        },
        deleteTask:(id)=>{
            dispatch({
                type:'DELETE_TASK',
                name: id
            })
        },
        sortTasks:()=>{
            dispatch({
                type: 'SORT_TASKS'
            })
        },
    })
)(App);
