import * as constants from '../utils/constants.js'
import Api from '../components/Api.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithDeleteCard from '../components/PopupWithDeleteCard.js'
import './index.css';

const api = new Api(constants.configApi);
const popupItem = new PopupWithForm('#popup_info', handleSubmitUser);
const popupCard = new PopupWithForm('#popup_card', handleSubmitCard);
const popupAvatar = new PopupWithForm('#popup_avatar', handelSubmitAvatar);
const popupImageClass = new PopupWithImage('#popup_image');
const popupDeleteCard = new PopupWithDeleteCard('#popup_delete-card', submitDeleteCard);

let userId = '';
const formValidAvatar = new FormValidator(constants.valueConfig, constants.formPopupAvatar);
const formValidCard = new FormValidator(constants.valueConfig, constants.formPopupCard);
const formValidProfile = new FormValidator(constants.valueConfig, constants.formPopupInfo);
const section = new Section(renderer, '.cards__list');
const userInfo = new UserInfo({name: '.profile__name', about: '.profile__profession', avatar: '.profile__avatar'});

function handelSubmitAvatar(data) {
  api.patchUserAvatar(data)
    .then(avatar => {
      userInfo.setUserInfo(avatar);
      popupAvatar.closePopup();
    })
    .catch(res => console.log(res));
}

function handleSubmitUser(data) {
  api.patchUser(data)
    .then((user) => {
      popupItem.closePopup()
      userInfo.setUserInfo(user)
    })
    .catch(res => console.log(res));
}

function handleSubmitCard(data) {
  api.creatNewCard(data)
    .then((res) => {
      section.addItem(renderer(res))
    })
}

function submitDeleteCard(id) {
  api.deleteCard(id)
    .then(() => {
      document.querySelector(`.card__list[data-id="${id}"]`).remove();
      popupDeleteCard.closePopup()
    }) 
}

function handelLikeCard(like, id) {
  if (like.classList.contains('card__like-button_active')) {
    api.deleteLike(id)
      .then(res => this._deleteLike(res))
      .catch(err => console.log(err))
  } else if (!like.classList.contains('card__like-button_active')) {
    api.putLike(id)
      .then(res => {
        this._addLike(res)
      })
      .catch(err => console.log(err))
  }
}

function deleteCard(id) {
  popupDeleteCard.openPopup(id);
}

function openPopupCard(name, link) {
  popupImageClass.openPopup(name, link)
}

function renderer(item) {
  const card = new Card(item, userId, handelLikeCard, deleteCard, openPopupCard);
  return card.createCard()
}

[formValidAvatar, formValidCard, formValidProfile].forEach(form => form.enableValidation())

popupImageClass.setEventListener();
popupCard.setEventListener();
popupItem.setEventListener();
popupDeleteCard.setEventListener();
popupAvatar.setEventListener();

constants.openButtonPopupCard.addEventListener('click', () => {
    popupCard.openPopup();
    formValidCard.clearValidationFrom();
  });

constants.openButtonPopupInfo.addEventListener('click', () => {
  popupItem.openPopup();
  formValidProfile.clearValidationFrom();
})

constants.openButtonPopupAvatar.addEventListener('click', () => {
  popupAvatar.openPopup();
  formValidAvatar.enableValidation();
})

Promise.allSettled([api.getUser(), api.getCards()])
  .then(([{value: user}, {value: cards}]) => {
    userInfo.setUserInfo(user)
    userId = user._id;
    section.rendererItems(cards)
  })
  .catch(err => console.log(err))