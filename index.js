let name = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');

let popup = document.querySelector('.popup');
let form = popup.querySelector('.popup__form');
let nameInput = form.querySelectorAll('.popup__field')[0];
let descriptionInput = form.querySelectorAll('.popup__field')[1];

let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');

function openPopup() {
    nameInput.value = name.textContent;
    descriptionInput.value = description.textContent;

    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault();

    name.textContent = nameInput.value;
    description.textContent = descriptionInput.value;

    closePopup();
}


editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
form.addEventListener('submit', handleFormSubmit);