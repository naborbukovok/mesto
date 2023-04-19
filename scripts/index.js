/* Основные элементы страницы. */
let nameCurrent = document.querySelector('.profile__name');
let descriptionCurrent = document.querySelector('.profile__description');
let elements = document.querySelector('.elements');
let imagePopups = document.querySelector('.image-popups');

/* Кнопки. */
let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');

/* Форма для редактирования профиля пользователя. */
let userPopup = document.querySelector('.popup_content_user');
let userForm = userPopup.querySelector('.popup__form');
let userNameInput = userForm.name;
let userDescriptionInput = userForm.description;
let userCloseButton = userPopup.querySelector('.popup__close-button');

/* Форма для добавления места. */
let placePopup = document.querySelector('.popup_content_place');
let placeForm = placePopup.querySelector('.popup__form');
let placeTitleInput = placeForm.title;
let placeImageInput = placeForm.image;
let placeCloseButton = placePopup.querySelector('.popup__close-button');

/* Редактирование информации о пользователе. */
function openUserPopup() {
    userNameInput.value = nameCurrent.textContent;
    userDescriptionInput.value = descriptionCurrent.textContent;

    userPopup.classList.add('popup_opened');
}

function closeUserPopup() {
    userPopup.classList.remove('popup_opened');
}

function handleUserFormSubmit (evt) {
    evt.preventDefault();

    nameCurrent.textContent = userNameInput.value;
    descriptionCurrent.textContent = userDescriptionInput.value;

    closeUserPopup();
}

editButton.addEventListener('click', openUserPopup);
userForm.addEventListener('submit', handleUserFormSubmit);
userCloseButton.addEventListener('click', closeUserPopup);

/* Добавление места. */
function openPlacePopup() {
    placeTitleInput.value = "";
    placeImageInput.value = "";
    placePopup.classList.add('popup_opened');
}

function closePlacePopup() {
    placePopup.classList.remove('popup_opened');
}

function handlePlaceFormSubmit (evt) {
    evt.preventDefault();
    addElement(placeTitleInput.value, placeImageInput.value);
    closePlacePopup();
}

addButton.addEventListener('click', openPlacePopup);
placeForm.addEventListener('submit', handlePlaceFormSubmit);
placeCloseButton.addEventListener('click', closePlacePopup);

function addElement(name, link) {
    const elementTemplate = document.querySelector('#element-template');
    const newElement = elementTemplate.content.cloneNode(true);

    /* Заполнение карточки и попапа, настройка открытия и закрытия попапа. */
    let newElementTitle = newElement.querySelector('.element__title');
    let newElementImage = newElement.querySelector('.element__image');
    let newElementPopup = newElement.querySelector('.popup');
    let newElementPopupCloseButton = newElementPopup.querySelector('.popup__close-button');
    let newElementPopupImage = newElementPopup.querySelector('.popup__image');
    newElementTitle.textContent = name;
    newElementImage.src = link;
    newElementImage.alt = `Фото: ${name}`;
    newElementPopupImage.src = link;
    newElementPopupImage.alt = `Фото: ${name}`;
    newElementImage.addEventListener('click', () => {
        newElementPopup.classList.add('popup_opened');
    });
    newElementPopupCloseButton.addEventListener('click', () => {
        newElementPopup.classList.remove('popup_opened');
    });

    /* Настройка удаления карточки. */
    let trashButton = newElement.querySelector('.element__trash-button');
    trashButton.addEventListener('click', () => {
        trashButton.parentElement.remove();
    });

    /* Настройка лайка карточки. */
    let likeButton = newElement.querySelector('.element__like-button');
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('element__like-button_enabled');
    });

    elements.prepend(newElement);
}

/* Запуск страницы. */
const initialCards = [
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    }
];

initialCards.forEach(item => {
    addElement(item.name, item.link);
});






