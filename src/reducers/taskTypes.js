const initialState = [];

export default function taskTypes(state=[], action){
    if( action.type == 'LOAD_TYPE' ){
        return action.taskTypes
    }

    return state;
}