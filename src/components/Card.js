export default class Card {
    constructor(
        userId,
        cardData,
        templateSelector,
        handleLikeButtonClick,
        handleTrashButtonClick,
        handleCardClick
    ) {
        // ID текущего пользователя.
        this._userId = userId;
        // Данные карточки.
        this._id = cardData._id;
        this._link = cardData.link;
        this._name = cardData.name;
        this._likes = cardData.likes;
        this._ownerId = cardData.owner._id;
        // Селектор шаблона карточки.
        this._templateSelector = templateSelector;
        // Обработка действий над карточкой.
        this._handleLikeButtonClick = handleLikeButtonClick;
        this._handleTrashButtonClick = handleTrashButtonClick;
        this._handleCardClick = handleCardClick;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.card__image');
        this._title = this._element.querySelector('.card__title');
        this._likeCount = this._element.querySelector('.card__like-count');
        this._likeButton = this._element.querySelector('.card__like-button');
        this._trashButton = this._element.querySelector('.card__trash-button');

        this._setEventListeners();

        // Настройка лайка.
        if (this.isLiked()) {
            this._likeButton.classList.add('card__like-button_enabled');
        }
        this._likeCount.textContent = this._likes.length;
        // Настройка кнопки-корзины.
        if (this._ownerId !== this._userId) {
            this._trashButton.classList.add('card__trash-button_hidden');
        }
        // Настройка картинки.
        this._image.src = this._link;
        this._image.alt = `Фото: ${this._name}`;
        this._title.textContent = this._name;

        return this._element;
    }

    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    isLiked() {
        const usersWhoLiked = this._likes.map(like => {
            return like._id;
        });
        if (usersWhoLiked.includes(this._userId)) {
            return true;
        }
        return false;
    }

    updateLikes(newLikes) {
        this._likes = newLikes;
        this._likeCount.textContent = this._likes.length;
        this._toggleLike();
    }

    _toggleLike() {
        this._likeButton.classList.toggle('card__like-button_enabled');
    }


    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .cloneNode(true)
            .querySelector('.card');

        return cardElement;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._handleLikeButtonClick(this._id);
        });

        this._trashButton.addEventListener('click', () => {
            this._handleTrashButtonClick(this._id);
        });

        this._image.addEventListener('click', () => {
            this._handleCardClick();
        });
    };

    // _handleLikeButtonClick() {
    //     this._likeButton.classList.toggle('card__like-button_enabled');
    // }

    // _handleTrashButtonClick() {
    //     this._element.remove();
    //     this._element = null;
    // }
}
