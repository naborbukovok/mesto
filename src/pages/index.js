import './index.css';

import {
    addButton,
    avatarEditButton,
    avatarPopupForm,
    avatarPopupSelector,
    avatarSelector,
    cardsContainerSelector,
    cardTemplateSelector,
    editButton,
    imagePopupSelector,
    placePopupForm,
    placePopupSelector,
    confirmationPopupSelector,
    userDescriptionSelector,
    userNameSelector,
    userPopupForm,
    userPopupSelector
} from '../utils/constants.js'

import Api from '../components/Api.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import PopupWithConfirmation from '../components/PopupWithConfirmation.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'

// Функция для создания элемента карточки.
function createCard(cardData) {
    const card = new Card(
        userId,
        cardData,
        cardTemplateSelector,
        // Обработка нажатия лайка.
        (cardId) => {
            if (!card.isLiked()) {
                api.addLike(cardId)
                    .then((newCardData) => {
                        card.updateLikes(newCardData.likes);
                    })
                    .catch((error) => {
                        console.log("Ошибка. Запрос не выполнен: ", error);
                    });
            } else {
                api.removeLike(cardId)
                    .then((newCardData) => {
                        card.updateLikes(newCardData.likes);
                    })
                    .catch((error) => {
                        console.log("Ошибка. Запрос не выполнен: ", error);
                    });
            }
        },
        // Обработка нажатия иконки корзины.
        (cardId) => {
            confirmationPopup.open(card, cardId);
        },
        // Обработка нажатия на картинку.
        () => {
            imagePopup.open(cardData);
        }
    );
    const cardElement = card.generateCard();
    return cardElement;
}

// АПИ.
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
    headers: {
        authorization: 'aac57ec8-075d-41b6-b46f-f2424eeecb8a',
        'Content-Type': 'application/json'
    }
});

// Информация профиля.
let userId;
const userInfo = new UserInfo(
    {
        avatarSelector, 
        nameSelector: userNameSelector,
        descriptionSelector: userDescriptionSelector
    }
);

// Секция с карточками.
const cards = new Section(
    {
        renderer: (cardData) => {
            const cardElement = createCard(cardData);
            cards.addItem(cardElement);
        }
    },
    cardsContainerSelector
);

// Попапы.
const avatarPopup = new PopupWithForm(
    avatarPopupSelector,
    (avatarData) => {
        avatarPopup.renderLoading(true);
        api.setAvatar(avatarData.avatar)
            .then((data) => {
                userInfo.setAvatar(data.avatar);
                avatarPopup.close();
            })
            .catch((error) => {
                console.log("Ошибка. Запрос не выполнен: ", error);
            })
            .finally(() => {
                avatarPopup.renderLoading(false);
            });
    }
);

const userPopup = new PopupWithForm(
    userPopupSelector,
    (userData) => {
        userPopup.renderLoading(true);
        api.setUserInfo(userData.name, userData.description)
            .then((data) => {
                userInfo.setUserInfo({ 
                    name: data.name,
                    description: data.about
                });
                userPopup.close();
            })
            .catch((error) => {
                console.log("Ошибка. Запрос не выполнен: ", error);
            })
            .finally(() => {
                userPopup.renderLoading(false);
            });
    }
);

const placePopup = new PopupWithForm(
    placePopupSelector,
    (cardData) => {
        placePopup.renderLoading(true);
        api.postCard(cardData.title, cardData.image)
            .then((data) => {
                const cardElement = createCard(data);
                cards.addItem(cardElement);
                placePopup.close();
            })
            .catch((error) => {
                console.log("Ошибка. Запрос не выполнен: ", error);
            })
            .finally(() => {
                placePopup.renderLoading(false);
            });
    }
);

const confirmationPopup = new PopupWithConfirmation(
    confirmationPopupSelector,
    (card, cardId) => {
        api.deleteCard(cardId)
            .then(() => {
                card.deleteCard();
                confirmationPopup.close();
            })
            .catch((error) => {
                console.log("Ошибка. Запрос не выполнен: ", error);
            });
    }
);

const imagePopup = new PopupWithImage(imagePopupSelector);

// Валидаторы форм.
const avatarPopupFormValidator = new FormValidator(
    {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
    },
    avatarPopupForm
);

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
avatarPopup.setEventListeners();
userPopup.setEventListeners();
placePopup.setEventListeners();
confirmationPopup.setEventListeners();
imagePopup.setEventListeners();

avatarPopupFormValidator.enableValidation();
userPopupFormValidator.enableValidation();
placePopupFormValidator.enableValidation();

avatarEditButton.addEventListener('click', () => {
    avatarPopupFormValidator.resetValidation();
    avatarPopup.open();
});

editButton.addEventListener('click', () => {
    const userData = userInfo.getUserInfo();
    userPopup.setInputValues(userData);
    userPopupFormValidator.resetValidation();
    userPopup.open();
});

addButton.addEventListener('click', () => {
    placePopupFormValidator.resetValidation();
    placePopup.open();
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
        userId = userData._id;
        userInfo.setUserInfo({ 
            name: userData.name,
            description: userData.about
        });
        userInfo.setAvatar(userData.avatar);
        cards.renderItems(cardsData.reverse());
    })
    .catch((error) => {
        console.log("Ошибка. Запрос не выполнен: ", error);
    });
