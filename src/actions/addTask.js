export const addTask = (taskValue, deadline, date, priority, existTasks)=>{
    return dispatch => {
            
        let id = Math.ceil(Math.random()*100);

        while( existTasks.filter(taskItem => taskItem.id == id).length > 0 ){
            id = Math.ceil(Math.random()*100);    
        }

        dispatch({
            type:'ADD_TASK',
            task:{
                id: id,
                name: taskValue,
                deadline: deadline,
                date: date,
                priority: priority
            }
        });
    }
}