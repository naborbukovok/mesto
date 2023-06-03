export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.popup__close-button');

        this.close = this.close.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        // Закрытие попапа кликом по оверлею.
        this._popup.addEventListener('click', (evt) => {
            if (evt.currentTarget === evt.target) {
                this.close();
            }
        });

        // Закрытие попапа кнопкой.
        this._closeButton.addEventListener('click', this.close);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
}
