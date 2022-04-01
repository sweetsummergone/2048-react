import { useCallback, useEffect, useReducer, useState } from "react";
import Cell from "./Cell";

function Gamefield() {
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

    const [field, dispatch] = useReducer(fieldReducer, [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
    const [zeros, setZeros] = useState(16);
    const handleMoveCells = useCallback(event => {
        switch (event.key) {
            case "Down": // IE/Edge specific value
            case "ArrowDown":
            case "s":
            case "S":
                moveCells("Down");
                break;
            case "Up": // IE/Edge specific value
            case "ArrowUp":
            case "w":
            case "W":
                moveCells("Up");
                break;
            case "Left": // IE/Edge specific value
            case "ArrowLeft":
            case "a":
            case "A":
                moveCells("Left");
                break;
            case "Right": // IE/Edge specific value
            case "ArrowRight":
            case "d":
            case "D":
                moveCells("Right");
                break;
            default:
                return; // Quit when this doesn't handle the key event.
        }
    })

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

    function moveCells(direction) {
        let newCellFlag = false;
        const modifiedArray = [...field];
        switch (direction) {
            case "Down":
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j <= 3; j++) {
                        if (modifiedArray[i][j] !== 0 && modifiedArray[i+1][j] === 0) {
                            modifiedArray[i+1][j] = modifiedArray[i][j];
                            modifiedArray[i][j] = 0;
                            newCellFlag = true;
                        }
                        else if (modifiedArray[i][j] !== 0 && modifiedArray[i+1][j] === modifiedArray[i][j]) {
                            modifiedArray[i+1][j] = modifiedArray[i][j] * 2;
                            modifiedArray[i][j] = 0;
                            newCellFlag = true;
                        }
                    }
                }
                dispatch("setup", {newField: modifiedArray});
                if (newCellFlag === true){
                    generateNewCell();
                    newCellFlag = false;
                }
                break;
            case "Up":
                for (let i = 3; i > 0; i--) {
                    for (let j = 3; j >= 0; j--) {
                        if (modifiedArray[i][j] !== 0 && modifiedArray[i-1][j] === 0) {
                            modifiedArray[i-1][j] = modifiedArray[i][j];
                            modifiedArray[i][j] = 0;
                            newCellFlag = true;
                        }
                        else if (modifiedArray[i][j] !== 0 && modifiedArray[i-1][j] === modifiedArray[i][j]) {
                            modifiedArray[i-1][j] = modifiedArray[i][j] * 2;
                            modifiedArray[i][j] = 0;
                            newCellFlag = true;
                        }
                    }
                }
                dispatch("setup", {newField: modifiedArray});
                if(newCellFlag === true){
                    generateNewCell();
                    newCellFlag = false;
                }
                break;
            case "Left":
                for (let i = 0; i <= 3; i++) {
                    for (let j = 3; j > 0; j--) {
                        if (modifiedArray[i][j] !== 0 && modifiedArray[i][j-1] === 0) {
                            modifiedArray[i][j-1] = modifiedArray[i][j];
                            modifiedArray[i][j] = 0;
                            newCellFlag = true;
                        }
                        else if (modifiedArray[i][j] !== 0 && modifiedArray[i][j-1] === modifiedArray[i][j]) {
                            modifiedArray[i][j-1] = modifiedArray[i][j] * 2;
                            modifiedArray[i][j] = 0;
                            newCellFlag = true;
                        }
                    }
                }
                dispatch("setup", {newField: modifiedArray});
                if(newCellFlag === true){
                    generateNewCell();
                    newCellFlag = false;
                }
                break;
            case "Right":
                for(let i = 0; i <= 3;i++) {
                    for (let j = 0; j < 3; j++) {
                        if (modifiedArray[i][j] !== 0 && modifiedArray[i][j+1] === 0) {
                            modifiedArray[i][j+1] = modifiedArray[i][j];
                            modifiedArray[i][j] = 0;
                            newCellFlag = true;
                        }
                        else if (modifiedArray[i][j] !== 0 && modifiedArray[i][j+1] === modifiedArray[i][j]) {
                            modifiedArray[i][j+1] = modifiedArray[i][j] * 2;
                            modifiedArray[i][j] = 0;
                            newCellFlag = true;
                        }
                    }
                }
                dispatch("setup", {newField: modifiedArray});
                if (newCellFlag === true){
                    generateNewCell();
                    newCellFlag = false;
                }
                break;
        }
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
                        <Cell key={y} value={value}/>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Gamefield;