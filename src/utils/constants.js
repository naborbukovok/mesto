// Профиль.
export const avatarSelector = '.profile__avatar';
export const userNameSelector = '.profile__name';
export const userDescriptionSelector = '.profile__description';
export const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');

// Секция с карточками.
export const cardTemplateSelector = '#card-template';
export const cardsContainerSelector = '.cards';

// Попап для изменения аватара пользователя.
export const avatarPopupSelector = '.popup_content_avatar';
export const avatarPopupForm = document.querySelector(`${avatarPopupSelector} .popup__form`);

// Попап для изменения информации о пользователе.
export const userPopupSelector = '.popup_content_user';
export const userPopupForm = document.querySelector(`${userPopupSelector} .popup__form`);

// Попап для добавления места.
export const placePopupSelector = '.popup_content_place';
export const placePopupForm = document.querySelector(`${placePopupSelector} .popup__form`);

// Попап для подтверждения действия.
export const confirmationPopupSelector = '.popup_content_confirmation';

// Попап для просмотра фотографии.
export const imagePopupSelector = '.popup_content_image';
