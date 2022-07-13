export const config = {
  url: 'https://nomoreparties.co/v1/plus-cohort-12',
  token: 'ae6caf2d-a00b-4726-a9ec-c3ff5914df0b',
  userId: ''
}

function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка ${res}`)
}

export function getCards() {
  return fetch(`${config.url}/cards`, {
  headers: {
    authorization: `${config.token}`
  }
  })
  .then(checkResponse)
}

export function getUser() {
  return fetch(`${config.url}/users/me`, {
  headers: {
    authorization: `${config.token}`
  }
  })
  .then(checkResponse)
}

export function patchUser(owner) {
  return fetch(`${config.url}/users/me`, {
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
  .then(checkResponse)
}

export function creatNewCard(name, link) {
  return fetch(`${config.url}/cards`, {
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
  .then(checkResponse)
}

export function deleteCard(cardId) {
  return fetch(`${config.url}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: `${config.token}`
    }
  })
  .then(checkResponse)
}

export function putLike(cardId) {
  return fetch(`${config.url}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: `${config.token}`
    }
  })
  .then(checkResponse)
}

export function deleteLike(cardId) {
  return fetch(`${config.url}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: `${config.token}`
    }
  })
  .then(checkResponse)
}

export function patchUserAvatar(owner) {
  return fetch(`${config.url}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: `${config.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: `${owner.avatar}`
    })
  })
  .then(checkResponse)
}