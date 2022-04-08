import { useEffect, useState } from "react";

function Cell(props) {
    const [value, setValue] = useState(props.value);

    let sliderClass = "";
    let appearClass = "";

    if (props.direction !== null) {
        sliderClass = `slide-to-${props.direction}-${props.step}-cell`;
    }

    if (props.step === "appear") {
        appearClass = "appear";
    }

    useEffect(() => {
        if (props.value !== 0 && props.value / 2 === value) {
            setTimeout(() => {
                setValue(props.value);
            }, 200);
        } else {
            setValue(props.value);
        }
    }, [props.value]);

    return (
        <div className={`gamefield__cell cell__${value} `+ sliderClass + " " + appearClass}>
            {value}
        </div>
    );
}

export default Cell;