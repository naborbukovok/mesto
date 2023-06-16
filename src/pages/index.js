import './index.css';

import {
    addButton,
    cardsContainerSelector,
    cardTemplateSelector,
    editButton,
    imagePopupSelector,
    initialCards,
    placePopupForm,
    placePopupSelector,
    userDescriptionSelector,
    userNameSelector,
    userPopupForm,
    userPopupSelector
} from '../utils/constants.js'

import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'

// Функция для создания карточки.
function createCard(cardData) {
    const card = new Card(
        cardData,
        cardTemplateSelector,
        () => {
            imagePopup.open(cardData);
        }
    );
    const cardElement = card.generateCard();
    return cardElement;
}

// Информация профиля.
const userInfo = new UserInfo(
    {
        nameSelector: userNameSelector,
        descriptionSelector: userDescriptionSelector
    }
);

// Секция с карточками.
const cards = new Section(
    {
        items: initialCards.reverse(),
        renderer: (cardData) => {
            const cardElement = createCard({ link: cardData.link, name: cardData.name });
            cards.addItem(cardElement);
        }
    },
    cardsContainerSelector
)

// Попапы.
const userPopup = new PopupWithForm(
    userPopupSelector,
    (userData) => {
        userInfo.setUserInfo(userData);
    }
);

const placePopup = new PopupWithForm(
    placePopupSelector,
    (cardData) => {
        const cardElement = createCard({ link: cardData.image, name: cardData.title });
        cards.addItem(cardElement);
    }
);

const imagePopup = new PopupWithImage(imagePopupSelector);

// Валидаторы форм.
const userPopupFormValidator = new FormValidator(
    {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
    },
    userPopupForm
);

const placePopupFormValidator = new FormValidator(
    {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
    },
    placePopupForm
);

// Настройка поведения страницы.
userPopup.setEventListeners();
placePopup.setEventListeners();
imagePopup.setEventListeners();

userPopupFormValidator.enableValidation();
placePopupFormValidator.enableValidation();

editButton.addEventListener('click', () => {
    const userData = userInfo.getUserInfo();
    // userPopupFormInputName.value = userData.name;
    // userPopupFormInputDescription.value = userData.description;
    userPopup.setInputValues(userData);
    userPopupFormValidator.resetValidation();
    userPopup.open();
});

addButton.addEventListener('click', () => {
    placePopupFormValidator.resetValidation();
    placePopup.open();
});

cards.renderItems();
