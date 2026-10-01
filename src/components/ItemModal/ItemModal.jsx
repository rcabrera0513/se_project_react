import './ItemModal.css';

function ItemModal({ activeModal, onClose, onDeleteItem, card }) {
    const isOpen = activeModal === "preview";

    return (
        <div className={`modal ${isOpen ? "modal_active" : ""}`}>
            <div className="modal__content modal__content_type_image">
                <button className="modal__close-button" type="button" onClick={onClose}>×</button>
                <img src={card?.imageUrl || card?.link} alt={card?.name || ""} className="modal__image" />
                <div className="modal__footer">
                    <h2 className="modal__caption">{card?.name || ""}</h2>
                    <p className="modal__weather">Weather: {card?.weather || ""}</p>
                    <button
                        className="modal__delete-button"
                        type="button"
                        onClick={() => onDeleteItem(card?._id)}
                    >
                        Delete item
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ItemModal;