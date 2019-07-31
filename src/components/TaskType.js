import React from 'react';
import Type from './Type';
import "../scss/Tasks.scss";
class TaskType extends React.Component{

    deleteClick(e){
        let input = e.target;
        let id = input.closest('.delete').querySelector('input');
        let value = id.value;
        this.props.deleteThisTask(value);

    }
    sortTasks(e){
        this.props.sortAllTasks();
    }

    render(){
        return(
                <div>
                    {this.props.taskTypes.map(typeItem=>
                        <div>
                            <Type typeInfo={typeItem}/>
                            <div className="sort-date" onClick={(e)=>this.sortTasks(e)}>Сортировать по дате</div>
                            <ol className="task-list">
                                {this.props.tasks != 0 ? this.props.tasks.map(taskItem=>
                                    <li className={"task-block " + taskItem.priority}>
                                        {/* <div id="priority" className={taskItem.priority}></div> */}
                                        <span>{taskItem.name}</span>
                                        <div className="delete">
                                            <input type="hidden" value={taskItem.id} id="task-id"></input><span onClick={(e)=>this.deleteClick(e)}>Удалить</span>
                                        </div>
                                        <div className="task-date">Дата создания: <span id="date-value">{taskItem.date != 0  ? taskItem.date :  "не указан" }</span></div>
                                        <div className="date-icon"></div> 
                                        <div className="task-deadline">Дедлайн: <span id="date-deadline">{taskItem.deadline != 0  ? taskItem.deadline :  "не указан" }</span></div> 
                                    </li>
                                ) : "Задач нет."} 
                            </ol>
                        </div>
                    )}
                </div>
        )
    }
}

export default TaskType;