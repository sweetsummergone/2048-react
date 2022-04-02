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
            case "Up":
            case "ArrowUp":
            case "w":
            case "W":
                moveCells("Up");
                break;
            case "Left":
            case "ArrowLeft":
            case "a":
            case "A":
                moveCells("Left");
                break;
            case "Right":
            case "ArrowRight":
            case "d":
            case "D":
                moveCells("Right");
                break;
            default:
                return;
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
        console.log(zeros);
    }

    function generateTestField() {
        // Full field test
        // let a = 2;
        // for (let i = 0; i <= 3; i++) {
        //     for (let j = 0; j <= 3; j++) {
        //         dispatch({type: "addNewCell", row: i, cell: j, value: a}); 
        //         a *= 2;
        //     }
        // }

        // New cell test (to down) - shouldn't arrive
        // dispatch({type: "addNewCell", row: 2, cell: 0, value: 8});
        // dispatch({type: "addNewCell", row: 3, cell: 0, value: 16});

        // New cell test (to left) - shouldn't arrive
        // dispatch({type: "addNewCell", row: 0, cell: 0, value: 16});

        // Far test
        // dispatch({type: "addNewCell", row: 2, cell: 3, value: 16});

        // Two different values far test
        // dispatch({type: "addNewCell", row: 2, cell: 1, value: 16});
        // dispatch({type: "addNewCell", row: 2, cell: 2, value: 16});
        // dispatch({type: "addNewCell", row: 2, cell: 3, value: 32});      

        // Neighbors test
        // dispatch({type: "addNewCell", row: 3, cell: 0, value: 16});
        // dispatch({type: "addNewCell", row: 3, cell: 1, value: 16});
        // dispatch({type: "addNewCell", row: 3, cell: 2, value: 2});
        // dispatch({type: "addNewCell", row: 3, cell: 3, value: 2});
    }

    function moveCells(direction) {
        let newCellFlag = false;
        const modifiedArray = [...field];

        switch (direction) {
            case "Down":
                for (let i = 0; i <= 3; i++) {
                    let zerosCounter = 0;
                    let currentValue = 0;
                    let currentRow = 0;
                    let currentCell = 0;
                    for (let j = 3; j >= 0; j--) {  
                        if (modifiedArray[j][i] === 0) {
                            zerosCounter += 1;
                        }
                        else if (currentValue === 0 && modifiedArray[j][i] !== 0) {
                            currentValue = modifiedArray[j][i];
                            modifiedArray[j + zerosCounter][i] = currentValue;
                            if (zerosCounter !== 0) {
                                modifiedArray[j][i] = 0;
                                newCellFlag = true;
                            }
                            currentRow = j + zerosCounter;
                            currentCell = i;
                        }
                        else if (currentValue !== 0 && modifiedArray[j][i] !== 0) {
                            if (currentValue === modifiedArray[j][i]) {
                                modifiedArray[currentRow][currentCell] *= 2;
                                modifiedArray[j][i] = 0;
                                zerosCounter += 1;
                                newCellFlag = true;
                            } else {
                                currentValue = modifiedArray[j][i];
                                currentRow = j + zerosCounter;
                                currentCell = i;
                                modifiedArray[j + zerosCounter][i] = currentValue;
                                if (j !== j + zerosCounter) {
                                    modifiedArray[j][i] = 0;
                                    newCellFlag = true;
                                }
                            }
                        }
                    }
                }
                break;
            case "Up":
                for (let i = 0; i <= 3; i++) {
                    let zerosCounter = 0;
                    let currentValue = 0;
                    let currentRow = 0;
                    let currentCell = 0;
                    for (let j = 0; j <= 3; j++) {  
                        if (modifiedArray[j][i] === 0) {
                            zerosCounter += 1;
                        }
                        else if (currentValue === 0 && modifiedArray[j][i] !== 0) {
                            currentValue = modifiedArray[j][i];
                            modifiedArray[j - zerosCounter][i] = currentValue;
                            if (zerosCounter !== 0) {
                                modifiedArray[j][i] = 0;
                                newCellFlag = true;
                            }
                            currentRow = j - zerosCounter;
                            currentCell = i;
                        }
                        else if (currentValue !== 0 && modifiedArray[j][i] !== 0) {
                            if (currentValue === modifiedArray[j][i]) {
                                modifiedArray[currentRow][currentCell] *= 2;
                                modifiedArray[j][i] = 0;
                                zerosCounter += 1;
                                newCellFlag = true;
                            } else {
                                currentValue = modifiedArray[j][i];
                                currentRow = j - zerosCounter;
                                currentCell = i;
                                modifiedArray[j - zerosCounter][i] = currentValue;
                                if (j !== j - zerosCounter) {
                                    modifiedArray[j][i] = 0;
                                    newCellFlag = true;
                                }
                            }
                        }
                    }
                }
                break;
            case "Left":
                for (let i = 0; i <= 3; i++) {
                    let zerosCounter = 0;
                    let currentValue = 0;
                    let currentRow = 0;
                    let currentCell = 0;
                    for (let j = 0; j <= 3; j++) {  
                        if (modifiedArray[i][j] === 0) {
                            zerosCounter += 1;
                        }
                        else if (currentValue === 0 && modifiedArray[i][j] !== 0) {
                            currentValue = modifiedArray[i][j];
                            modifiedArray[i][j - zerosCounter] = currentValue;
                            if (zerosCounter !== 0) {
                                modifiedArray[i][j] = 0;
                                newCellFlag = true;
                            }
                            currentRow = i;
                            currentCell = j - zerosCounter;
                        }
                        else if (currentValue !== 0 && modifiedArray[i][j] !== 0) {
                            if (currentValue === modifiedArray[i][j]) {
                                modifiedArray[currentRow][currentCell] *= 2;
                                modifiedArray[i][j] = 0;
                                zerosCounter += 1;
                                newCellFlag = true;
                            } else {
                                currentValue = modifiedArray[i][j];
                                currentRow = i;
                                currentCell = j - zerosCounter;
                                modifiedArray[i][j - zerosCounter] = currentValue;
                                if (j !== j - zerosCounter) {
                                    modifiedArray[i][j] = 0;
                                    newCellFlag = true;
                                }
                            }
                        }
                    }
                }
                break;
            case "Right":
                for (let i = 0; i <= 3; i++) {
                    let zerosCounter = 0;
                    let currentValue = 0;
                    let currentRow = 0;
                    let currentCell = 0;
                    for (let j = 3; j >= 0; j--) {  
                        if (modifiedArray[i][j] === 0) {
                            zerosCounter += 1;
                        }
                        else if (currentValue === 0 && modifiedArray[i][j] !== 0) {
                            currentValue = modifiedArray[i][j];
                            modifiedArray[i][j + zerosCounter] = currentValue;
                            if (zerosCounter !== 0) {
                                modifiedArray[i][j] = 0;
                                newCellFlag = true;
                            }
                            currentRow = i;
                            currentCell = j + zerosCounter;
                        }
                        else if (currentValue !== 0 && modifiedArray[i][j] !== 0) {
                            if (currentValue === modifiedArray[i][j]) {
                                modifiedArray[currentRow][currentCell] *= 2;
                                modifiedArray[i][j] = 0;
                                zerosCounter += 1;
                                newCellFlag = true;
                            } else {
                                currentValue = modifiedArray[i][j];
                                currentRow = i;
                                currentCell = j + zerosCounter;
                                modifiedArray[i][j + zerosCounter] = currentValue;
                                if (j !== j - zerosCounter) {
                                    modifiedArray[i][j] = 0;
                                    newCellFlag = true;
                                }
                            }
                        }
                    }
                }
                break;
        }
        
        dispatch("setup", {newField: modifiedArray});
        if(newCellFlag === true){
            generateNewCell();
            newCellFlag = false;
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
                        <Cell key={x+""+y} value={value} />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Gamefield;