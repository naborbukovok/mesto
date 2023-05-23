export class FormValidator {
    constructor(formValidatorData, formElement) {
        this._inputSelector = formValidatorData.inputSelector;
        this._submitButtonSelector = formValidatorData.submitButtonSelector;
        this._inactiveButtonClass = formValidatorData.inactiveButtonClass;
        this._inputErrorClass = formValidatorData.inputErrorClass;
        this._errorClass = formValidatorData.errorClass;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    }

    enableValidation() {
        this._setEventListeners();
        this._toggleButtonState();
    }

    resetValidation() {
        this._inputList.forEach((input) => {
            this._hideInputError(input);
        });
        this._toggleButtonState();
    }

    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._handleChangeInput(inputElement);
            });
        });
    }

    _handleChangeInput(inputElement) {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = errorMessage;
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', 'disabled');
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
}
