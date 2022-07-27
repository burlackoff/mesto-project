export class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res}`)
  }

  _getData(url, method) {
    return fetch(`${this._baseUrl}/${url}`, {
      method: method,
      headers: this._headers
    })
    .then(this._checkResponse)
    .catch(err => console.log(err))
  }

  _setData(url, method, data) {
    return fetch(`${this._baseUrl}/${url}`, {
      method: method,
      headers: this._headers,
      body: JSON.stringify({data})
    })
    .then(this._checkResponse)
    .catch(err => console.log(err))
  }

  getCards() {
    return this._getData('cards', 'GET')
  }

  getUser() {
    return this._getData('users/me', 'GET')
  }

  patchUser() {
    return this._setData('users/me', 'PATCH', data)
  }

  creatNewCard() {
    return this._setData('cards', 'POST', data)
  }

  deleteCard(id) {
    return this._getData(`cards/${id}`, 'DELETE')
  }

  putLike(id) {
    return this._getData(`cards/likes/${id}`, 'PUT')
  }

  deleteLike(id) {
    return this._getData(`cards/likes/${id}`, 'DELETE')
  }

  patchUserAvatar() {
    return this._setData('users/me/avatar', 'PATCH', data)
  }
}

export const config = {
  url: 'https://nomoreparties.co/v1/plus-cohort-12',
  token: 'ae6caf2d-a00b-4726-a9ec-c3ff5914df0b'
}
