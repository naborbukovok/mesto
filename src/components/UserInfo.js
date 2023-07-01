export default class UserInfo {
    constructor({ avatarSelector, nameSelector, descriptionSelector }) {
        this._name = document.querySelector(nameSelector);
        this._description = document.querySelector(descriptionSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return({
            name: this._name.textContent, 
            description: this._description.textContent
        });
    }

    setAvatar(avatar) {
        this._avatar.src = avatar;
    }

    setUserInfo({ name, description }) {
        this._name.textContent = name;
        this._description.textContent = description;
    }
}