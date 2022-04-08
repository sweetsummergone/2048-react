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

    let startX = 0;
    let startY = 0;

    const handleMoveCells = useCallback(event => {
        setDirection(getDirection(event.key));
        dispatch({type: "moveCells", direction: event.key});
    });

    const handleMoveCellsTouchStart = useCallback(event => {
        startX = event.changedTouches[0].screenX;
        startY = event.changedTouches[0].screenY;
    });

    const handleMoveCellsTouchEnd = useCallback(event => {
        const diffX = event.changedTouches[0].screenX - startX;
        const diffY = event.changedTouches[0].screenY - startY;
        const ratioX = Math.abs(diffX / diffY);
        const ratioY = Math.abs(diffY / diffX);
        const absDiff = Math.abs(ratioX > ratioY ? diffX : diffY);

        // Ignore small movements.
        if (absDiff < 30) {
            return;
        }

        if (ratioX > ratioY) {
            if (diffX >= 0) {
                dispatch({type: "moveCells", direction: "Right"});
            } else {
                dispatch({type: "moveCells", direction: "Left"});
            }
        } else {
            if (diffY >= 0) {
                dispatch({type: "moveCells", direction: "Down"});
            } else {
                dispatch({type: "moveCells", direction: "Up"});
            }
        }
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
        window.addEventListener("touchstart", handleMoveCellsTouchStart);
        window.addEventListener("touchend", handleMoveCellsTouchEnd);

        return () => {
            window.removeEventListener("keydown", handleMoveCells);
            window.removeEventListener("touchstart", handleMoveCellsTouchStart);
            window.removeEventListener("touchend", handleMoveCellsTouchEnd);
        };
    }, [handleMoveCells, handleMoveCellsTouchStart, handleMoveCellsTouchEnd]);

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