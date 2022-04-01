function Cell(props) {
    const classes = props.value === 0 ? "gamefield__cell cell" : `gamefield__cell cell cell__${props.value}`;

    return (
        <div className={classes}>
            {props.value}
        </div>
    );
}

export default Cell;