export class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._link = data.link;
        this._name = data.name;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.element__image');
        this._title = this._element.querySelector('.element__title');
        this._likeButton = this._element.querySelector('.element__like-button');
        this._trashButton = this._element.querySelector('.element__trash-button');

        this._setEventListeners();

        this._image.src = this._link;
        this._image.alt = `Фото: ${this._name}`;
        this._title.textContent = this._name;

        return this._element;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .cloneNode(true)
            .querySelector('.element');

        return cardElement;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._handleLikeButtonClick();
        });

        this._trashButton.addEventListener('click', () => {
            this._handleTrashButtonClick();
        });

        this._image.addEventListener('click', () => {
            this._handleCardClick();
        });
    };

    _handleLikeButtonClick() {
        this._likeButton.classList.toggle('element__like-button_enabled');
    }

    _handleTrashButtonClick() {
        this._element.remove();
    }
}
