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
const popupProfile = new PopupWithForm('#popup_info', handleSubmitUser);
const popupCard = new PopupWithForm('#popup_card', handleSubmitCard);
const popupAvatar = new PopupWithForm('#popup_avatar', handelSubmitAvatar);
const popupImage = new PopupWithImage('#popup_image');
const popupDeleteCard = new PopupWithDeleteCard('#popup_delete-card', submitDeleteCard);

const formValidAvatar = new FormValidator(constants.valueConfig, constants.formPopupAvatar);
const formValidCard = new FormValidator(constants.valueConfig, constants.formPopupCard);
const formValidProfile = new FormValidator(constants.valueConfig, constants.formPopupInfo);
const section = new Section(renderer, '.cards__list');
const userInfo = new UserInfo({name: '.profile__name', about: '.profile__profession', avatar: '.profile__avatar'});

function handelSubmitAvatar(data) {
  popupAvatar.rendererLoading(true, 'Создание...');
  api.patchUserAvatar(data)
    .then(avatar => {
      userInfo.setUserInfo(avatar);
      popupAvatar.closePopup();
    })
    .catch(res => console.log(res))
    .finally(() => popupAvatar.rendererLoading(false, 'Создать'))
}

function handleSubmitUser(data) {
  popupProfile.rendererLoading(true)
  api.patchUser(data)
    .then((user) => {
      userInfo.setUserInfo(user)
      popupProfile.closePopup()
    })
    .catch(res => console.log(res))
    .finally(() => popupProfile.rendererLoading(false))
}

function handleSubmitCard(data) {
  popupCard.rendererLoading(true, 'Создание...')
  api.creatNewCard(data)
    .then((res) => {
      section.addItem(renderer(res));
      popupCard.closePopup();
    })
    .catch(res => console.log(res))
    .finally(() => popupCard.rendererLoading(true, 'Создать'))
}

function submitDeleteCard(id) {
  api.deleteCard(id)
    .then(() => {
      document.querySelector(`.card__list[data-id="${id}"]`).remove();
      popupDeleteCard.closePopup()
    }) 
}

function handelLikeCard(card) {
  const data = card.statusLike() ? api.deleteLike(card._id) : api.putLike(card._id);
  data
    .then((res) => {
      card.likes = res.likes
      card.updateLikes()})
    .catch(err => console.log(err))
}

function deleteCard(id) {
  popupDeleteCard.openPopup(id);
}

function openPopupCard(name, link) {
  popupImage.openPopup(name, link)
}

function renderer(item) {
  const card = new Card(item, constants.userId, handelLikeCard, deleteCard, openPopupCard);
  return card.createCard()
}

[formValidAvatar, formValidCard, formValidProfile].forEach(form => form.enableValidation())

popupImage.setEventListener();
popupCard.setEventListener();
popupProfile.setEventListener();
popupDeleteCard.setEventListener();
popupAvatar.setEventListener();

constants.openButtonPopupCard.addEventListener('click', () => {
  popupCard.openPopup();
  formValidCard.clearValidationFrom();
});

constants.openButtonPopupInfo.addEventListener('click', () => {
  popupProfile.openPopup();
  formValidProfile.clearValidationFrom();
  popupProfile.setInputValues(userInfo.getUserInfo());
})

constants.openButtonPopupAvatar.addEventListener('click', () => {
  popupAvatar.openPopup();
  formValidAvatar.enableValidation();
})

Promise.allSettled([api.getUser(), api.getCards()])
  .then(([{value: user}, {value: cards}]) => {
    userInfo.setUserInfo(user);
    constants.userId._id = user._id;
    section.rendererItems(cards);
  })
  .catch(err => console.log(err))