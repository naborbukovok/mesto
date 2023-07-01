import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleConfirmation) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._handleConfirmation = handleConfirmation;
    }

    open(element, id) {
        this._element = element;
        this._id = id;
        super.open();
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleConfirmation(this._element, this._id);
            this.close();
        });
        super.setEventListeners();
    }
}