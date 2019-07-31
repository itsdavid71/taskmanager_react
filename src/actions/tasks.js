export const getTask = ()=>{
    return dispatch=>{
        fetch('/api/tasks.json').
        then(response=>{
            return response.json();
        }).
        then(data=>{
            dispatch({
                type: 'LOAD_TASKS',
                tasks: data.tasks
            })
        });
}

}