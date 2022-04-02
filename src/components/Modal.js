function Modal(props) {
    return (
        <div className="modal__gameover hidden">
            <div className="modal__content">
                <span className="modal__close">&times;</span>
                <p className="modal__text">Game over</p>
            </div>
        </div>
    );
}

export default Modal;