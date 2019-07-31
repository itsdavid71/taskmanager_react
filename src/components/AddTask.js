import React from 'react';
import "../scss/AddTask.scss";
import {CSSTransition} from 'react-transition-group';

class AddTask extends React.Component{
    constructor(props) {
        super(props);
        this.state=({
            isSubmit: false,
            check: true,
            date: new Date().toLocaleString()
        });
    };
    

    onSubmitHandler(e){
        e.persist(); //техническая деталь, для того, чтобы event-объект был "нормальным"
        e.preventDefault();

        this.setState({
            isSubmit: false,
            check: true,
            check2: false
        });


        let taskValue = e.target.querySelector('textarea').value;
        let deadline = e.target.querySelector('input').value;
        let date = this.state.date;
        let priority = e.target.querySelector('input[type=checkbox]').checked;
        if (priority == true) {
            priority = "priority";
        } else {
            priority = "not-priority";
        }

        if(taskValue == "") {
            this.setState({
                isSubmit: !this.state.isSubmit,
                check: true,
                check2: !this.state.isSubmit

            });
            
        }  else {
            this.props.actionAddTask(taskValue, deadline, date, priority);
            e.target.querySelector('textarea').value = '';
            e.target.querySelector('input').value = '';
            e.target.querySelector('input[type=checkbox]').checked = false;
            this.setState({
                check: false,
                isSubmit: !this.state.isSubmit
            }); 
        }
    }

  

    render(){
    
        let isSubmit = this.state.isSubmit;
        let check = this.state.check;
        let check2 = this.state.check2;
        return(
            <CSSTransition in={check == true ? check2  : isSubmit} timeout={100} classNames={check == true ? "check-block" : "popup-block"}>
                <div>
                    <div className="popup" id="popup">
                        <p>Задача добавлена!</p>
                    </div>
                    <div className="popup-2" id="popup-2">
                        <p>Введите данные!</p>
                    </div>
                    <form onSubmit={e=>this.onSubmitHandler(e)}>
                        <textarea type="text" name="task" placeholder="Текст задачи"/>
                        <input type="date" name="date"></input>
                        <label className="priority-block">
                            <input type="checkbox" name="priority"></input>
                            <p>Важная задача</p>
                        </label>
                        <button className="buttonSubmit" type="submit">Добавить задачу</button>
                    </form>
                </div>
            </CSSTransition>

        );
    }
}

export default AddTask;