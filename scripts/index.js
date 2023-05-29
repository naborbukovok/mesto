import { initialCards } from './data.js'
import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

// Список попапов на странице.
const popups = Array.from(document.querySelectorAll('.popup'))

// Список форм на странице.
const forms = Array.from(document.querySelectorAll('.popup__form'));

// Элементы секции profile.
const nameCurrent = document.querySelector('.profile__name');
const descriptionCurrent = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Элементы секции cards.
const cardsContainer = document.querySelector('.cards');

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

// Валидаторы форм.
const userFormValidator = new FormValidator(
    {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
    },
    userForm
);

const placeFormValidator = new FormValidator(
    {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
    },
    placeForm
);

// Функция для сброса валидации формы.
const resetValidation = (formValidator) => {
    formValidator.resetValidation();
}

// Функции для работы с попапами.
const openPopup = (popupElement) => {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupWithKeyboard);
}

const handleCardClick = (cardData) => {
    imagePopupPhoto.src = cardData.link;
    imagePopupPhoto.alt = `Фото: ${cardData.name}`;
    imagePopupDescription.textContent = cardData.name;
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

const closePopupWithOverlay = (evt) => {
    if (evt.currentTarget === evt.target) {
        closePopup(evt.currentTarget)
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
    const card = createCard( {
        name: placeTitleInput.value,
        link: placeImageInput.value
    });
    cardsContainer.prepend(card);
    closePopup(placePopup);
}

// Функция для создания элемента.
const createCard = (cardData) => {
    const card = new Card(
        cardData,
        '#card-template',
        () => handleCardClick(cardData)
    );
    return card.generateCard();
}

// Обработчики событий для кнопок в секции profile.
editButton.addEventListener('click', () => {
    userNameInput.value = nameCurrent.textContent;
    userDescriptionInput.value = descriptionCurrent.textContent;
    resetValidation(userFormValidator);
    openPopup(userPopup);
});

addButton.addEventListener('click', () => {
    placeForm.reset();
    resetValidation(placeFormValidator);
    openPopup(placePopup);
});

// Обработчики событий для формы редактирования профиля.
userCloseButton.addEventListener('click', () => {
    closePopup(userPopup);
});

userForm.addEventListener('submit', handleUserFormSubmit);

// Обработчики событий для формы добавления нового места.
placeCloseButton.addEventListener('click', () => {
    closePopup(placePopup);
});

placeForm.addEventListener('submit', handlePlaceFormSubmit);

// Обработчик события закрытия попапа с фотографией.
imageCloseButton.addEventListener('click', () => {
    closePopup(imagePopup);
});

// Обработчики событий клика по оверлею для всех попапов.
popups.forEach((popup) => {
    popup.addEventListener('click', closePopupWithOverlay)
})

// Настройка валидации форм и добавление карточек при первом запуске страницы.
userFormValidator.enableValidation();
placeFormValidator.enableValidation();

initialCards.forEach(initialCard => {
    const card = createCard(initialCard);
    cardsContainer.append(card);
});
