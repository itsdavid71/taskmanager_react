export const getType = ()=>{
    return dispatch=>{
        fetch('/api/taskTypes.json').
        then(response=>{
            return response.json();
        }).
        then(data=>{
            dispatch({
                type: 'LOAD_TYPE',
                taskTypes: data.taskTypes
            })
        });
    }
}