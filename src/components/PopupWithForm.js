import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._formInputList = this._form.querySelectorAll('.popup__input');
        this._formButton = this._form.querySelector('.popup__button');
        this._formButtonUsualText = this._formButton.textContent;
        this._formButtonLoadingText = "Сохранение...";
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

    renderLoading(isLoading) {
        if (isLoading) {
            this._formButton.textContent = this._formButtonLoadingText;
        } else {
            this._formButton.textContent = this._formButtonUsualText;
        }
    }

    setInputValues(data) {
        this._formInputList.forEach((input) => {
            input.value = data[input.name];
        });
    }

    _getInputValues() {
        this._formValues = {};
        this._formInputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }
}