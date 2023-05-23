import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

// Список форм на странице.
const formList = Array.from(document.querySelectorAll('.popup__form'));

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
const userNameError = userForm.querySelector('.name-error');
const userDescriptionError = userForm.querySelector('.description-error');
const userButton = userForm.querySelector('.popup__button');
const userCloseButton = userPopup.querySelector('.popup__close-button');

// Элементы формы добавления нового места.
const placePopup = document.querySelector('.popup_content_place');
const placeForm = placePopup.querySelector('.popup__form');
const placeTitleInput = placeForm.title;
const placeImageInput = placeForm.image;
const placeTitleError = placeForm.querySelector('.title-error');
const placeImageError = placeForm.querySelector('.image-error');
const placeButton = placeForm.querySelector('.popup__button');
const placeCloseButton = placePopup.querySelector('.popup__close-button');

// Элементы попапа изображения.
const imagePopup = document.querySelector('.popup_content_image');
const imagePopupPhoto = imagePopup.querySelector('.popup__image');
const imagePopupDescription = imagePopup.querySelector('.popup__image-description');
const imageCloseButton = imagePopup.querySelector('.popup__close-button');

// Функции для работы с попапами.
const openPopup = (popupElement) => {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupWithKeyboard);
}

const handleCardClick = (link, name) => {
    imagePopupPhoto.src = link;
    imagePopupPhoto.alt = `Фото: ${name}`;
    imagePopupDescription.textContent = name;
    openPopup(imagePopup);
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
    const newElement = createElement(placeImageInput.value, placeTitleInput.value);
    elements.prepend(newElement);
    closePopup(placePopup);
}

// Функция для создания элемента.
const createElement = (link, name) => {
    const card = new Card(
        { link, name },
        '#element-template',
        () => handleCardClick(link, name)
    );
    return card.generateCard();
}

// Обработчики событий для кнопок в секции profile.
editButton.addEventListener('click', () => {
    userNameInput.value = nameCurrent.textContent;
    userNameInput.classList.remove('popup__input_type_error');
    userDescriptionInput.value = descriptionCurrent.textContent;
    userDescriptionInput.classList.remove('popup__input_type_error');
    userNameError.classList.remove('popup__error_visible');
    userDescriptionError.classList.remove('popup__error_visible');
    openPopup(userPopup);
    userButton.classList.add('popup__button_disabled');
    userButton.setAttribute('disabled', 'disabled');
});

addButton.addEventListener('click', () => {
    placeTitleInput.value = '';
    placeTitleInput.classList.remove('popup__input_type_error');
    placeImageInput.value = '';
    placeImageInput.classList.remove('popup__input_type_error');
    placeTitleError.classList.remove('popup__error_visible');
    placeImageError.classList.remove('popup__error_visible');
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

// Настройка валидации форм и добавление карточек при первом запуске страницы.
formList.forEach((formElement) => {
    const formValidator = new FormValidator(
        {
            inputSelector: '.popup__input',
            submitButtonSelector: '.popup__button',
            inactiveButtonClass: 'popup__button_disabled',
            inputErrorClass: 'popup__input_type_error',
            errorClass: 'popup__error_visible'
        },
        formElement
    );
    formValidator.enableValidation();
});

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

initialCards.forEach(item => {
    const newElement = createElement(item.link, item.name);
    elements.append(newElement);
});
