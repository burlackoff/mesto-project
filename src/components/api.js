import {nameProfile, professionProfile} from './utils.js'

const config = {
  url: 'plus-cohort-12',
  token: 'ae6caf2d-a00b-4726-a9ec-c3ff5914df0b'
}

export function getCards() {
  return fetch(`https://nomoreparties.co/v1/${config.url}/cards`, {
  headers: {
    authorization: `${config.token}`
  }
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
     return Promise.reject(`Ошибка ${res}`)
  })
}

export function getUser() {
  fetch(`https://nomoreparties.co/v1/${config.url}/users/me`, {
  headers: {
    authorization: `${config.token}`
  }
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res}`);
  })
  .then(data => {
    nameProfile.textContent = data.name;
    professionProfile.textContent = data.about;
  })
  .catch(err => console.log(err))
}

export function patchUser(name, about) {
  fetch(`https://nomoreparties.co/v1/${config.url}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: `${config.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  });
}

function creatNewCard() {
  
}