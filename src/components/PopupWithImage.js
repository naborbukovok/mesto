import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.popup__image');
        this._imageDescription = this._popup.querySelector('.popup__image-description');
    }

    open({ link, name }) {
        this._image.src = link;
        this._image.alt = `Фото: ${name}`;
        this._imageDescription.textContent = name;
        super.open();
    }
}