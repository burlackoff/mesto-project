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
  // .then(res => res.json())
  // .then((result) => {
  //   console.log(result);
  // })
  // .catch((err) => {
  //   console.log(`Ошибка ${err}`)
  // })
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