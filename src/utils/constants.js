// Профиль.
export const userNameSelector = '.profile__name';
export const userDescriptionSelector = '.profile__description';
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');

// Секция с карточками.
export const cardTemplateSelector = '#card-template';
export const cardsContainerSelector = '.cards';

// Попап для изменения информации о пользователе.
export const userPopupSelector = '.popup_content_user';
export const userPopupForm = document.querySelector(`${userPopupSelector} .popup__form`);

// Попап для добавления места.
export const placePopupSelector = '.popup_content_place';
export const placePopupForm = document.querySelector(`${placePopupSelector} .popup__form`);

// Попап для просмотра фотографии.
export const imagePopupSelector = '.popup_content_image';

// Первоначальные данные карточек.
export const initialCards = [
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
