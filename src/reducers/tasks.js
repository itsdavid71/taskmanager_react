export default function tasks( state=[], action ){
    function orderByDate(arr, dateProp) {
        return arr.slice().sort(function (a, b) {
            return a[dateProp] < b[dateProp] ? -1 : 1;
        });
    }
    if( action.type == 'LOAD_TASKS' ){
        console.log( action.tasks );
        return action.tasks
    } else if( action.type == 'ADD_TASK' ){
        console.log("--------");
        console.log(action);
        return [...state, action.task];
    } else if( action.type == 'DELETE_TASK' ){
        const myState = [...state];
        console.log(myState);
        console.log("--------");

        myState.forEach((stateItem, stateKey)=>{
            if (stateItem.id == action.name){
                myState.splice(stateKey, 1);
            }
        });

        return myState;
    } else if( action.type == 'SORT_TASKS' ){
        const tasks = [...state];
        
       
        tasks.sort((a, b)=>{
            let aDate = new Date(a.deadline);
            let bDate = new Date(b.deadline);
            
            return aDate.getTime() - bDate.getTime();

        });

        tasks.sort((a, b)=>{
            if ((a.priority == 'priority')) {
                return -1;
            } else {
                return 1;
            }
        });

        return tasks;
    }

    return state;
}