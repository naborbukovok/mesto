let nameCurrent = document.querySelector('.profile__name');
let descriptionCurrent = document.querySelector('.profile__description');

let popup = document.querySelector('.popup');
let form = popup.querySelector('.popup__form');
let nameInput = form.querySelector('input[name=name]');
let descriptionInput = form.querySelector('input[name=description]');

let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');

function openPopup() {
    nameInput.value = nameCurrent.textContent;
    descriptionInput.value = descriptionCurrent.textContent;

    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault();

    nameCurrent.textContent = nameInput.value;
    descriptionCurrent.textContent = descriptionInput.value;

    closePopup();
}


editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
form.addEventListener('submit', handleFormSubmit);