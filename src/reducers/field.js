import { moveCells, addNewCell } from "../modules/modules";

const fieldReducer = (state, action) => {
    switch (action.type) {
        case "addNewCell": {
            return addNewCell(state, action.row, action.cell, action.value);
        }

        case "moveCells": {
            return moveCells(state, action.direction);
        }

        default:
            return state;
    }
}

export default fieldReducer;