export function moveCells(field, direction) {
    let newCellFlag = false;
    const modifiedArray = [...field];

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
        case "ArrowUp":
        case "w":
        case "W":
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
        case "ArrowLeft":
        case "a":
        case "A":
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
        case "ArrowRight":
        case "d":
        case "D":
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
        default:
    }

    return [modifiedArray, newCellFlag]
}