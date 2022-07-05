export const config = {
  url: 'plus-cohort-12',
  token: 'ae6caf2d-a00b-4726-a9ec-c3ff5914df0b',
  userId: '94daa3f73b361f2df69c95ee'
}

function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка ${res}`)
}

export function getCards() {
  return fetch(`https://nomoreparties.co/v1/${config.url}/cards`, {
  headers: {
    authorization: `${config.token}`
  }
  })
  .then(res => checkResponse(res))
}

export function getUser() {
  return fetch(`https://nomoreparties.co/v1/${config.url}/users/me`, {
  headers: {
    authorization: `${config.token}`
  }
  })
  .then(res => checkResponse(res))
  .catch(err => console.log(err))
}

export function patchUser(owner) {
  return fetch(`https://nomoreparties.co/v1/${config.url}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: `${config.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: owner.name,
      about: owner.about,
      avatar: `${owner.avatar}`
    })
  })
  .then(res => checkResponse(res))
}

export function creatNewCard(name, link) {
  fetch(`https://nomoreparties.co/v1/${config.url}/cards`, {
    method: 'POST',
    headers: {
      authorization: `${config.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: `${link}`
    })
  })
  .then(res => checkResponse(res))
  .catch(err => console.log(err))
}

export function deleteCard(cardId) {
  fetch(`https://nomoreparties.co/v1/${config.url}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: `${config.token}`
    }
  })
  .then(res => checkResponse(res))
}

export function putLike(cardId) {
  return fetch(`https://nomoreparties.co/v1/${config.url}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: `${config.token}`
    }
  })
  .then(res => checkResponse(res))
}

export function deleteLike(cardId) {
  return fetch(`https://nomoreparties.co/v1/${config.url}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: `${config.token}`
    }
  })
  .then(res => checkResponse(res))
}

export function patchUserAvatar(owner) {
  return fetch(`https://nomoreparties.co/v1/${config.url}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: `${config.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: `${owner.avatar}`
    })
  })
  .then(res => checkResponse(res))
}