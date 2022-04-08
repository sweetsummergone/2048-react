import { useCallback, useEffect, useReducer, useState } from "react";
import { getEmptyCell, getDirection } from "../modules/modules";
import fieldReducer from "../reducers/field";
import Cell from "./Cell";

function Gamefield() {
    const [field, dispatch] = useReducer(fieldReducer, 
        [   [{row: 0, cell: 0, value: 0, step: 0}, {row: 0, cell: 1, value: 0, step: 0}, {row: 0, cell: 2, value: 0, step: 0}, {row: 0, cell: 3, value: 0, step: 0}],
            [{row: 1, cell: 0, value: 0, step: 0}, {row: 1, cell: 1, value: 0, step: 0}, {row: 1, cell: 2, value: 0, step: 0}, {row: 1, cell: 3, value: 0, step: 0}],
            [{row: 2, cell: 0, value: 0, step: 0}, {row: 2, cell: 1, value: 0, step: 0}, {row: 2, cell: 2, value: 0, step: 0}, {row: 2, cell: 3, value: 0, step: 0}],
            [{row: 3, cell: 0, value: 0, step: 0}, {row: 3, cell: 1, value: 0, step: 0}, {row: 3, cell: 2, value: 0, step: 0}, {row: 3, cell: 3, value: 0, step: 0}]
        ]);

    const [direction, setDirection] = useState(null);

    const handleMoveCells = useCallback(event => {
        setDirection(getDirection(event.key));
        dispatch({type: "moveCells", direction: event.key});
    });

    function generateNewCell() {
        const [row, cell] = getEmptyCell(field);
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
        <>
            <div className="gamefield__background">
                {field.map((row, x) => (
                    <div className="gamefield__row" key={x}>
                        {row.map((element, y) => (
                            <Cell key={x+""+y} value={0}></Cell>
                        ))}
                    </div>
                ))}
                <div className="gamefield">
                    {field.map((row, x) => (
                        <div className="gamefield__row" key={x}>
                            {row.map((element, y) => (
                                <Cell key={x+""+y} value={element["value"]} step={element["step"]} direction={direction}></Cell>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Gamefield;