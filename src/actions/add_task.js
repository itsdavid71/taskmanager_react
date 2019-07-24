export const addStudent = (taskValue, date)=>{
    return dispatch => {

        setTimeout(()=>{
            
            let id = Math.ceil(Math.random()*100);

            dispatch({
                type:'ADD_TASK',
                student:{
                    id: id,
                    taskValue: taskValue,
                    date: date
                }
            });

        }, 1000);
    }
}