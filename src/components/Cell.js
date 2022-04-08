import { useEffect, useState } from "react";

function Cell(props) {
    const [value, setValue] = useState(props.value);

    const classes = props.value === 0 ? ["gamefield__cell", "cell"] : ["gamefield__cell", "cell", `cell__${props.value}`];
    if (props.direction !== null || props.direction !== "appear") {
        classes.push(`slide-to-${props.direction}-${props.step}-cell`);
    }

    useEffect(() => {
        if (props.value !== 0 && props.value / 2 === value) {
            setTimeout(() => {
                setValue(props.value);
            }, 500)
        } else {
            setValue(props.value);
        }
    }, [props.value]);

    return (
        <div className={classes.join(" ")}>
            {value}
        </div>
    );
}

export default Cell;