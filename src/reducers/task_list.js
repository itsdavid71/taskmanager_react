export default function task( state=[], action ){
    if( action.type == 'ADD_TASK' ){
        return [
            ...state,
            action.data
        ];
    }
    return state;
}