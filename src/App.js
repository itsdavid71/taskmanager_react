import React from 'react';
import {connect} from 'react-redux';
import "./scss/App.scss";
import {CSSTransition} from 'react-transition-group';

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state=({
            isSubmit: false,
            check: true
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
        let dateValue = e.target.querySelector('input').value;
        
        let date1 = new Date;

        let dateSpan = document.getElementById("date-value");        
        if(inputValue == "") {
            this.setState({
                isSubmit: !this.state.isSubmit,
                check: true,
                check2: !this.state.isSubmit

            });
            
        }  else {
            this.props.addTask(inputValue, dateValue);
            this.setState({
                check: false,
                isSubmit: !this.state.isSubmit
            }); 
        }
        
    }

    deleteClick(e){
        this.props.deleteTask(e.target.getElementsByClassName('task-block'));
    }
  

    render(){;
        const store = this.props.testStore;
        
        let isSubmit = this.state.isSubmit;
        let check = this.state.check;
        let check2 = this.state.check2;
        console.log( isSubmit);
        console.log(check);
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
            </CSSTransition>
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
