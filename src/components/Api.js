export default class Api {
    constructor(data) {
      this.baseUrl = data.baseUrl;
      this.headers = data.headers;
    }
  
    // Загрузка информации о пользователе с сервера (GET).
    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers,
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
    }

    // Загрузка карточек с сервера (GET).
    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers,
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        })
    }

    // Редактирование аватара (PATCH).
    setAvatar(avatar) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({ avatar })
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        })
    }

    // Редактирование профиля (PATCH).
    setUserInfo(name, about) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({ name, about })
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        })
    }

    // Добавление новой карточки (POST).
    postCard(name, link) {
        return fetch(`${this.baseUrl}/cards`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({ name, link })
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        })
    }

    // Удаление карточки (DELETE).
    deleteCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this.headers
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        })
    }

    // Добавление лайка (PUT).
    addLike(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this.headers
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        })
    }

    // Удаление лайка (DELETE).
    removeLike(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this.headers
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        })
    }

}
