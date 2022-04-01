import { useEffect, useState } from "react";
import Cell from "./Cell";

function Gamefield() {
    const [field, setField] = useState([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
    const [zeros, setZeros] = useState(16);

    function generateCell() {
        const randomRowIndex = Math.floor(Math.random() * field.length);
        const randomCellIndex = Math.floor(Math.random() * field[0].length);

        if (field[randomRowIndex][randomCellIndex] === 0) {
            return [...field.slice(0, randomRowIndex), 
                    [
                        ...field[randomRowIndex].slice(0, randomCellIndex),
                        2,
                        ...field[randomRowIndex].slice(randomCellIndex + 1)
                    ],
                    ...field.slice(randomRowIndex + 1)];
        } else {
            if(zeros !== 0) {
                generateCell();
            }
        }
    }

    function addTwo() {
        setField(generateCell());
        setZeros(zeros - 1);
    }

    useEffect(() => {
        setField(generateCell());
        setZeros(zeros - 1);
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
            <button onClick={addTwo}>Press me to generate sometnihg</button>
        </div>
    );
}

export default Gamefield;