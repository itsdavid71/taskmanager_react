import React from 'react';
import {connect} from 'react-redux';
import "./scss/App.scss";

class App extends React.Component{
    handlerSubmit(e){
        e.persist(); //техническая деталь, для того, чтобы event-объект был "нормальным"
        e.preventDefault();

        let inputValue = e.target.querySelector('textarea').value;
        let dateValue = e.target.querySelector('input').value;
        
        if (inputValue != "") {
            this.props.addTask(inputValue, dateValue);
        } 
        let date1 = new Date;

        let dateSpan = document.getElementById("date-value");        
        // (dateSpan).val(123);
        // console.log(date1);
    }
    deleteClick(e){
        this.props.deleteTask(e.target.getElementsByClassName('task-block'));
    }
    constructor() {
        super();

        
    }

    render(){
        console.log( this.props.testStore );
        const store = this.props.testStore;
        return(
            <div className="background">
                <div className="bg-black">
                    <div className="container">
                        <header>
                        </header>
                        <h1>Task Manager</h1>
                        <div className="flex">
                            <form onSubmit={(e)=>this.handlerSubmit(e)}>
                                <h2>Добавить задачу</h2>
                                <textarea type="text" name="course"></textarea>
                                <h4>Укажите срок задачи </h4>
                                <input type="date" name="date"></input>
                                <button className="buttonSubmit" type="submit">Добавить задачу</button>
                            </form>
                            <div>
                                <h2>Список задач</h2>
                                <ol>
                                    {store != 0 ? store.map(val=>
                                        <li className="task-block">{val.taskValue}
                                            <div onClick={(e)=>this.deleteClick(e)} className="delete">Удалить</div>
                                            <div className="task-date">Выполнить до: <span id="date-value">{val.date}</span></div> 
                                        </li>
                                    ) : "Задач нет."} 
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(
    state=>({
        testStore:state
    }),
    dispatch=>({
        addTask:(taskValue, date)=>{
            dispatch({
                type: 'ADD_TASK',
                data: {
                    taskValue,
                    date
                }
            })
        },
        deleteTask:(taskValue)=>{
            dispatch({
                type:'DELETE_TASK',
                name: taskValue
            })
        }
    })
)(App);
