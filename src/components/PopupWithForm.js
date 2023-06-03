import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._handleFormSubmit = handleFormSubmit;
    }

    close() {
        this._form.reset();
        super.close();
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        });
        super.setEventListeners();
    }

    _getInputValues() {
        this._formInputList = this._form.querySelectorAll('.popup__input');
        this._formValues = {};
        this._formInputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }
}