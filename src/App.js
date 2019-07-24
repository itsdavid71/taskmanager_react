import React from 'react';
import {connect} from 'react-redux';
import "./scss/App.scss";
import {CSSTransition} from 'react-transition-group';

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state=({
            isSubmit: false,
            check: true,
            date: new Date().toLocaleString()
        });
    };

    handlerSubmit(e){
        e.persist(); //техническая деталь, для того, чтобы event-объект был "нормальным"
        e.preventDefault();

        this.setState({
            isSubmit: false,
            check: true,
            check2: false
        });

        let inputValue = e.target.querySelector('textarea').value;
        let deadline = e.target.querySelector('input').value;
        let date = this.state.date;
        let id = Math.ceil(Math.random()*10000);

        // let dateSpan = document.getElementById("date-value");        
        if(inputValue == "") {
            this.setState({
                isSubmit: !this.state.isSubmit,
                check: true,
                check2: !this.state.isSubmit

            });
            
        }  else {
            this.props.addTask(id, inputValue, date, deadline);
            e.target.querySelector('textarea').value = '';
            // e.target.querySelector('input').value = '';
            this.setState({
                check: false,
                isSubmit: !this.state.isSubmit
            }); 
        }
        
    }

    sortTask(e) {
        this.props.sortTask();
        console.log(1);
    }

    deleteClick(e){
        let input = e.target;
        let id = input.closest('.delete').querySelector('input');
        let value = id.value;
        this.props.deleteTask(value);
    }
  

    render(){;
        const store = this.props.testStore;
        
        let isSubmit = this.state.isSubmit;
        let check = this.state.check;
        let check2 = this.state.check2;
        return(
            <CSSTransition in={check == true ? check2  : isSubmit} timeout={100} classNames={check == true ? "check-block" : "popup-block"}>

                <div className="background popup-block popup-check">
                    <div className="bg-black">
                    <div className="popup" id="popup">
                        <p>Задача добавлена!</p>
                    </div>
                    <div className="popup-2" id="popup-2">
                        <p>Введите данные!</p>
                    </div>
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
                                    <div className="sort-date" onClick={(e)=>this.sortTask(e)}>Сортировать по дате</div>
                                    <ol>
                                        {store != 0 ? store.map(val=>
                                            <li className="task-block">
                                                <span>{val.taskValue}</span>
                                                <div className="delete">
                                                    <input type="hidden" value={val.id} id="task-id"></input><span onClick={(e)=>this.deleteClick(e)}>Удалить</span>
                                                </div>
                                                <div className="task-date">Дата создания: <span id="date-value">{val.date != 0  ? val.date :  "не указан" }</span></div>
                                                <div className="date-icon"></div> 
                                                <div className="task-deadline">Дедлайн: <span id="date-deadline">{val.deadline != 0  ? val.deadline :  "не указан" }</span></div> 
                                            </li>
                                        ) : "Задач нет."} 
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        )
    }
}


export default connect(
    state=>({
        testStore:state
    }),
    dispatch=>({
        addTask:(id, taskValue, date, deadline)=>{
            dispatch({
                type: 'ADD_TASK',
                data: {
                    id,
                    taskValue,
                    date,
                    deadline
                }
            })
        },
        deleteTask:(id)=>{
            dispatch({
                type:'DELETE_TASK',
                name: id
            })
        },
        sortTask:()=>{
            dispatch({
                type: 'SORT_TASK'
            })
        }
    })
)(App);
