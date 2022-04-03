import { useCallback, useEffect, useReducer } from "react";
import fieldReducer from "../reducers/field";
import { moveCells } from "../modules/modules";
import Cell from "./Cell";

function Gamefield() {
    const [field, dispatch] = useReducer(fieldReducer, [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
    
    const handleMoveCells = useCallback(event => {
        const [newField, isNewCellFlag] = moveCells(field, event.key);
        
        dispatch("setup", {newField: newField});
        if (isNewCellFlag) {
            generateNewCell();
        }
    });

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
        dispatch({type: "addNewCell", row: row, cell: cell, value: 2});
    }

    useEffect(() => {
        generateNewCell();
        generateNewCell();
    }, []);

    useEffect(() => {
        window.addEventListener("keydown", handleMoveCells);
        return () => {
            window.removeEventListener("keydown", handleMoveCells);
        };
    }, [handleMoveCells]);

    return (
        <div className="gamefield">
            {field.map((row, x) => (
                <div className="gamefield__row" key={x}>
                    {row.map((value, y) => (
                        <Cell key={x+""+y} value={value} />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Gamefield;