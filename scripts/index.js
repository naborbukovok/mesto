// Элементы секции profile.
const nameCurrent = document.querySelector('.profile__name');
const descriptionCurrent = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Элементы секции elements.
const elements = document.querySelector('.elements');

// Элементы формы редактирования профиля.
const userPopup = document.querySelector('.popup_content_user');
const userForm = userPopup.querySelector('.popup__form');
const userNameInput = userForm.name;
const userDescriptionInput = userForm.description;
const userCloseButton = userPopup.querySelector('.popup__close-button');

// Элементы формы добавления нового места.
const placePopup = document.querySelector('.popup_content_place');
const placeForm = placePopup.querySelector('.popup__form');
const placeTitleInput = placeForm.title;
const placeImageInput = placeForm.image;
const placeButton = placeForm.querySelector('.popup__button');
const placeCloseButton = placePopup.querySelector('.popup__close-button');

// Элементы попапа изображения.
const imagePopup = document.querySelector('.popup_content_image');
const imagePopupPhoto = imagePopup.querySelector('.popup__image');
const imagePopupDescription = imagePopup.querySelector('.popup__image-description');
const imageCloseButton = imagePopup.querySelector('.popup__close-button');

// Шаблон элемента.
const elementTemplate = document.querySelector('#element-template');

// Функции для работы с попапами.
const openPopup = (popupElement) => {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupWithKeyboard);
}

const closePopup = (popupElement) => {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupWithKeyboard);
}

const closePopupWithKeyboard = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

const handleUserFormSubmit = (evt) => {
    evt.preventDefault();
    nameCurrent.textContent = userNameInput.value;
    descriptionCurrent.textContent = userDescriptionInput.value;
    closePopup(userPopup);
}

const handlePlaceFormSubmit = (evt) => {
    evt.preventDefault();
    const newElement = createElement(placeTitleInput.value, placeImageInput.value);
    elements.prepend(newElement);
    closePopup(placePopup);
}

// Функция для создания элемента.
const createElement = (name, link) => {
    const newElement = elementTemplate.content.cloneNode(true).querySelector('.element');

    // Заполнение карточки.
    const newElementTitle = newElement.querySelector('.element__title');
    const newElementImage = newElement.querySelector('.element__image');
    newElementTitle.textContent = name;
    newElementImage.src = link;
    newElementImage.alt = `Фото: ${name}`;

    // Настройка открытия попапа с фотографией.
    newElementImage.addEventListener('click', () => {
        imagePopupPhoto.src = newElementImage.src;
        imagePopupPhoto.alt = newElementImage.alt;
        imagePopupDescription.textContent = newElementTitle.textContent;
        openPopup(imagePopup);
    });

    // Настройка удаления карточки.
    const trashButton = newElement.querySelector('.element__trash-button');
    trashButton.addEventListener('click', () => {
        trashButton.parentElement.remove();
    });

    // Настройка лайка карточки.
    const likeButton = newElement.querySelector('.element__like-button');
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('element__like-button_enabled');
    });

    return newElement;
}

// Обработчики событий для кнопок в секции profile.
editButton.addEventListener('click', () => {
    userNameInput.value = nameCurrent.textContent;
    userDescriptionInput.value = descriptionCurrent.textContent;
    openPopup(userPopup);
});

addButton.addEventListener('click', () => {
    placeTitleInput.value = "";
    placeImageInput.value = "";
    openPopup(placePopup);
    placeButton.classList.add('popup__button_disabled');
    placeButton.setAttribute('disabled', 'disabled');
});

// Обработчики событий для формы редактирования профиля.
userPopup.addEventListener('click', (evt) => {
    if (evt.currentTarget === evt.target) {
        closePopup(userPopup);
    }
});

userCloseButton.addEventListener('click', () => {
    closePopup(userPopup);
});

userForm.addEventListener('submit', handleUserFormSubmit);

// Обработчики событий для формы добавления нового места.
placePopup.addEventListener('click', (evt) => {
    if (evt.currentTarget === evt.target) {
        closePopup(placePopup);
    }
});

placeCloseButton.addEventListener('click', () => {
    closePopup(placePopup);
});

placeForm.addEventListener('submit', handlePlaceFormSubmit);

// Обработчик события закрытия попапа с фотографией.
imagePopup.addEventListener('click', (evt) => {
    if (evt.currentTarget === evt.target) {
        closePopup(imagePopup);
    }
});

imageCloseButton.addEventListener('click', () => {
    closePopup(imagePopup);
});

// Добавление карточек при первом запуске страницы.
initialCards.forEach(item => {
    const newElement = createElement(item.name, item.link);
    elements.append(newElement);
});
