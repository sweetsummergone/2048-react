import { useCallback, useEffect, useReducer } from "react";
import { getEmptyCell } from "../modules/modules";
import fieldReducer from "../reducers/field";
import Cell from "./Cell";

function Gamefield() {
    const [field, dispatch] = useReducer(fieldReducer, 
        [   [{row: 0, cell: 0, value: 0, step: 0}, {row: 0, cell: 1, value: 0, step: 0}, {row: 0, cell: 2, value: 0, step: 0}, {row: 0, cell: 3, value: 0, step: 0}],
            [{row: 1, cell: 0, value: 0, step: 0}, {row: 1, cell: 1, value: 0, step: 0}, {row: 1, cell: 2, value: 0, step: 0}, {row: 1, cell: 3, value: 0, step: 0}],
            [{row: 2, cell: 0, value: 0, step: 0}, {row: 2, cell: 1, value: 0, step: 0}, {row: 2, cell: 2, value: 0, step: 0}, {row: 2, cell: 3, value: 0, step: 0}],
            [{row: 3, cell: 0, value: 0, step: 0}, {row: 3, cell: 1, value: 0, step: 0}, {row: 3, cell: 2, value: 0, step: 0}, {row: 3, cell: 3, value: 0, step: 0}]
        ]);

    const handleMoveCells = useCallback(event => {
        dispatch({type: "moveCells", direction: event.key});
    });

    function generateNewCell() {
        const [row, cell] = getEmptyCell(field);
        dispatch({type: "addNewCell", row: row, cell: cell, value: 2});
    }

    function animate() {
        dispatch({type: "moveCells", direction: "bottom"});
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
                    {row.map((element, y) => (
                        <Cell key={x+""+y} value={element["value"]}></Cell>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Gamefield;