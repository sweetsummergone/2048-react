export function moveCells(field, direction) {
    let newCellFlag = false;
    const modifiedObject = JSON.parse(JSON.stringify(field));;

    switch (direction) {
        case "Down": // IE/Edge specific value
        case "ArrowDown":
        case "s":
        case "S":
            for (let i = 0; i <= 3; i++) {
                let zerosCounter = 0;
                let currentValue = 0;
                let currentRow = 0;
                let currentCell = 0;
                for (let j = 3; j >= 0; j--) {  
                    if (modifiedObject[j][i]["value"] === 0) {
                        zerosCounter += 1;
                    }
                    else if (currentValue === 0 && modifiedObject[j][i]["value"] !== 0) {
                        currentValue = modifiedObject[j][i]["value"];
                        modifiedObject[j + zerosCounter][i]["value"] = currentValue;
                        modifiedObject[j + zerosCounter][i]["step"] = zerosCounter;
                        if (zerosCounter !== 0) {
                            modifiedObject[j][i]["value"] = 0;
                            modifiedObject[j][i]["step"] = 0;
                            newCellFlag = true;
                        }
                        currentRow = j + zerosCounter;
                        currentCell = i;
                    }
                    else if (currentValue !== 0 && modifiedObject[j][i]["value"] !== 0) {
                        if (currentValue === modifiedObject[j][i]["value"]) {
                            zerosCounter += 1;
                            modifiedObject[j][i]["value"] = 0;
                            modifiedObject[j][i]["step"] = 0;
                            modifiedObject[currentRow][currentCell]["value"] *= 2;
                            modifiedObject[currentRow][currentCell]["step"] = zerosCounter;
                            newCellFlag = true;
                        } else {
                            currentValue = modifiedObject[j][i]["value"];
                            currentRow = j + zerosCounter;
                            currentCell = i;
                            modifiedObject[j + zerosCounter][i]["value"] = currentValue;
                            modifiedObject[j + zerosCounter][i]["step"] = zerosCounter;
                            if (j !== j + zerosCounter) {
                                modifiedObject[j][i]["value"] = 0;
                                modifiedObject[j][i]["step"] = 0;
                                newCellFlag = true;
                            }
                        }
                    }
                }
            }
            break;
        case "Up":
        case "ArrowUp":
        case "w":
        case "W":
            for (let i = 0; i <= 3; i++) {
                let zerosCounter = 0;
                let currentValue = 0;
                let currentRow = 0;
                let currentCell = 0;
                for (let j = 0; j <= 3; j++) {  
                    if (modifiedObject[j][i]["value"] === 0) {
                        zerosCounter += 1;
                    }
                    else if (currentValue === 0 && modifiedObject[j][i]["value"] !== 0) {
                        currentValue = modifiedObject[j][i]["value"];
                        modifiedObject[j - zerosCounter][i]["value"] = currentValue;
                        modifiedObject[j - zerosCounter][i]["step"] = zerosCounter;
                        if (zerosCounter !== 0) {
                            modifiedObject[j][i]["value"] = 0;
                            modifiedObject[j][i]["step"] = 0;
                            newCellFlag = true;
                        }
                        currentRow = j - zerosCounter;
                        currentCell = i;
                    }
                    else if (currentValue !== 0 && modifiedObject[j][i]["value"] !== 0) {
                        if (currentValue === modifiedObject[j][i]["value"]) {
                            zerosCounter += 1;
                            modifiedObject[j][i]["value"] = 0;
                            modifiedObject[j][i]["step"] = 0;
                            modifiedObject[currentRow][currentCell]["value"] *= 2;
                            modifiedObject[currentRow][currentCell]["step"] = zerosCounter;
                            newCellFlag = true;
                        } else {
                            currentValue = modifiedObject[j][i]["value"];
                            currentRow = j - zerosCounter;
                            currentCell = i;
                            modifiedObject[j - zerosCounter][i]["value"] = currentValue;
                            modifiedObject[j - zerosCounter][i]["step"] = zerosCounter;
                            if (j !== j - zerosCounter) {
                                modifiedObject[j][i]["value"] = 0;
                                modifiedObject[j][i]["step"] = 0;
                                newCellFlag = true;
                            }
                        }
                    }
                }
            }
            break;
        case "Left":
        case "ArrowLeft":
        case "a":
        case "A":
            for (let i = 0; i <= 3; i++) {
                let zerosCounter = 0;
                let currentValue = 0;
                let currentRow = 0;
                let currentCell = 0;
                for (let j = 0; j <= 3; j++) {  
                    if (modifiedObject[i][j]["value"] === 0) {
                        zerosCounter += 1;
                    }
                    else if (currentValue === 0 && modifiedObject[i][j]["value"] !== 0) {
                        currentValue = modifiedObject[i][j]["value"];
                        modifiedObject[i][j - zerosCounter]["value"] = currentValue;
                        modifiedObject[i][j - zerosCounter]["step"] = zerosCounter;
                        if (zerosCounter !== 0) {
                            modifiedObject[i][j]["value"] = 0;
                            modifiedObject[i][j]["step"] = 0;
                            newCellFlag = true;
                        }
                        currentRow = i;
                        currentCell = j - zerosCounter;
                    }
                    else if (currentValue !== 0 && modifiedObject[i][j]["value"] !== 0) {
                        if (currentValue === modifiedObject[i][j]["value"]) {
                            zerosCounter += 1;
                            modifiedObject[i][j]["value"] = 0;
                            modifiedObject[i][j]["step"] = 0;
                            modifiedObject[currentRow][currentCell]["value"] *= 2;
                            modifiedObject[currentRow][currentCell]["step"] = zerosCounter;
                            newCellFlag = true;
                        } else {
                            currentValue = modifiedObject[i][j]["value"];
                            currentRow = i;
                            currentCell = j - zerosCounter;
                            modifiedObject[i][j - zerosCounter]["value"] = currentValue;
                            modifiedObject[i][j - zerosCounter]["step"] = zerosCounter;
                            if (j !== j - zerosCounter) {
                                modifiedObject[i][j]["value"] = 0;
                                modifiedObject[i][j]["step"] = 0;
                                newCellFlag = true;            
                            }
                        }
                    }
                }
            }
            break;
        case "Right":
        case "ArrowRight":
        case "d":
        case "D":
            for (let i = 0; i <= 3; i++) {
                let zerosCounter = 0;
                let currentValue = 0;
                let currentRow = 0;
                let currentCell = 0;
                for (let j = 3; j >= 0; j--) {  
                    if (modifiedObject[i][j]["value"] === 0) {
                        zerosCounter += 1;
                    }
                    else if (currentValue === 0 && modifiedObject[i][j]["value"] !== 0) {
                        currentValue = modifiedObject[i][j]["value"];
                        modifiedObject[i][j + zerosCounter]["value"] = currentValue;
                        modifiedObject[i][j + zerosCounter]["step"] = zerosCounter;
                        if (zerosCounter !== 0) {
                            modifiedObject[i][j]["value"] = 0;
                            modifiedObject[i][j]["step"] = 0;
                            newCellFlag = true;
                        }
                        currentRow = i;
                        currentCell = j + zerosCounter;
                    }
                    else if (currentValue !== 0 && modifiedObject[i][j]["value"] !== 0) {
                        if (currentValue === modifiedObject[i][j]["value"]) {
                            zerosCounter += 1;
                            modifiedObject[i][j]["value"] = 0;
                            modifiedObject[i][j]["step"] = 0;
                            modifiedObject[currentRow][currentCell]["value"] *= 2;
                            modifiedObject[currentRow][currentCell]["step"] = zerosCounter;
                            newCellFlag = true;
                        } else {
                            currentValue = modifiedObject[i][j]["value"];
                            currentRow = i;
                            currentCell = j + zerosCounter;
                            modifiedObject[i][j + zerosCounter]["value"] = currentValue;
                            modifiedObject[i][j + zerosCounter]["step"] = zerosCounter;
                            if (j !== j - zerosCounter) {
                                modifiedObject[i][j]["value"] = 0;
                                modifiedObject[i][j]["step"] = 0;
                                newCellFlag = true;
                            }
                        }
                    }
                }
            }
            break;
        default:
    }

    if (newCellFlag) {
        let [row, cell] = getEmptyCell(modifiedObject);
        return addNewCell(modifiedObject, row, cell, 2);
    }

    return modifiedObject;
}

export function getEmptyCell(field) {        
    const randomRowIndex = Math.floor(Math.random() * field.length);
    const randomCellIndex = Math.floor(Math.random() * field[0].length);

    if (field[randomRowIndex][randomCellIndex]["value"] === 0) {
        return [randomRowIndex, randomCellIndex];
    }
    
    return getEmptyCell(field);
}

export function addNewCell(field, row, cell, value) {
    return [
        ...field.slice(0, row), 
        [
            ...field[row].slice(0, cell),
            {
                row: row,
                cell: cell,
                value: value,
                step: 0
            },
            ...field[row].slice(cell + 1)
        ],
        ...field.slice(row + 1)
    ]
}

export function getDirection(key) {
    switch (key) {
        case "Down":
        case "ArrowDown":
        case "s":
        case "S":
            return "bot";
        case "Up":
        case "ArrowUp":
        case "w":
        case "W":
            return "up";
        case "Left":
        case "ArrowLeft":
        case "a":
        case "A":
            return "left";
        case "Right":
        case "ArrowRight":
        case "d":
        case "D":
            return "right";
        default:
            return null;
    }
}