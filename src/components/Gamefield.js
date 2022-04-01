import { useEffect, useReducer, useState } from "react";
import Cell from "./Cell";

function Gamefield() {
    const fieldReducer = (state, action) => {
        switch(action.type) {
            case "modify": {
                return [...state.slice(0, action.row), 
                    [
                        ...state[action.row].slice(0, action.cell),
                        action.value,
                        ...state[action.row].slice(action.cell + 1)
                    ],
                    ...state.slice(action.row + 1)];
            }

            default:
                return state;
        }
    }

    const [field, dispatch] = useReducer(fieldReducer, [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
    const [zeros, setZeros] = useState(16);

    function getEmptyCell() {        
        const randomRowIndex = Math.floor(Math.random() * field.length);
        const randomCellIndex = Math.floor(Math.random() * field[0].length);

        if (field[randomRowIndex][randomCellIndex] === 0) {
            return [randomRowIndex, randomCellIndex];
        }
        return getEmptyCell();
    }

    function generateNewCell() {
        const [row, cell] = getEmptyCell();
        dispatch({type: "modify", row: row, cell: cell, value: 2});
    }

    useEffect(() => {
        generateNewCell();
        generateNewCell();
    }, []);

    return (
        <div className="gamefield">
            {field.map((row, x) => (
                <div className="gamefield__row" key={x}>
                    {row.map((value, y) => (
                        <Cell key={y} value={value}/>
                    ))}
                </div>
            ))}
            <button onClick={ () => {
                generateNewCell();
            }}>Press me to generate something</button>
        </div>
    );
}

export default Gamefield;