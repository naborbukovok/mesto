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
const placeCloseButton = placePopup.querySelector('.popup__close-button');

// Элементы попапа изображения.
const imagePopup = document.querySelector('.popup_content_image');
const imagePopupPhoto = imagePopup.querySelector('.popup__image');
const imagePopupDescription = imagePopup.querySelector('.popup__image-description');
const imageCloseButton = imagePopup.querySelector('.popup__close-button');

// Шаблон элемента.
const elementTemplate = document.querySelector('#element-template');

// Функции для работы с попапами.
function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
}

function handleUserFormSubmit (evt) {
    evt.preventDefault();
    nameCurrent.textContent = userNameInput.value;
    descriptionCurrent.textContent = userDescriptionInput.value;
    closePopup(userPopup);
}

function handlePlaceFormSubmit (evt) {
    evt.preventDefault();
    const newElement = createElement(placeTitleInput.value, placeImageInput.value);
    elements.prepend(newElement);
    closePopup(placePopup);
}

// Функция для создания элемента.
function createElement(name, link) {
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
});

// Обработчики событий для кнопок в форме редактирования профиля.
userCloseButton.addEventListener('click', () => {
    closePopup(userPopup);
});

userForm.addEventListener('submit', handleUserFormSubmit);

// Обработчики событий для кнопок в форме добавления нового места.
placeCloseButton.addEventListener('click', () => {
    closePopup(placePopup);
});

placeForm.addEventListener('submit', handlePlaceFormSubmit);

// Обработчик события закрытия попапа с фотографией.
imageCloseButton.addEventListener('click', () => {
    closePopup(imagePopup);
});

// Добавление карточек при первом запуске страницы.
initialCards.forEach(item => {
    const newElement = createElement(item.name, item.link);
    elements.append(newElement);
});
