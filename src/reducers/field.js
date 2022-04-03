const fieldReducer = (state, action) => {
    switch(action.type) {
        case "addNewCell": {
            return [...state.slice(0, action.row), 
                [
                    ...state[action.row].slice(0, action.cell),
                    action.value,
                    ...state[action.row].slice(action.cell + 1)
                ],
                ...state.slice(action.row + 1)];
        }

        case "setup": {
            return action.newField;
        }

        default:
            return state;
    }
}

export default fieldReducer;