import * as constants from '../components/utils.js'
import { createCard } from '../components/card.js'
import { closePopup, openPopup } from '../components/modal.js'
import Api from '../components/api.js'
import Card from '../components/card_new.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import Popup from '../components/Popup.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import './index.css';

let userId = '';
const formValidAvatar = new FormValidator(constants.valueConfig, constants.formPopupAvatar);
const formValidCard = new FormValidator(constants.valueConfig, constants.formPopupCard);
const formValidProfile = new FormValidator(constants.valueConfig, constants.formPopupInfo);

[formValidAvatar, formValidCard, formValidProfile].forEach(form => form.enableValidation())

const popupAva = new Popup('#popup_avatar');
const popupItem = new PopupWithForm('#popup_info', handleSubmit)

popupItem.setEventListener()

function handleSubmit({nameProfile, professionProfile}) {
  constants.cardConfig.owner.name = nameProfile;
  constants.cardConfig.owner.about = professionProfile;
  console.log(constants.cardConfig);

  api.patchUser(constants.cardConfig.owner)
    .then((res) => {
      this.closePopup()
      constants.nameProfile.textContent = res.name;
      constants.professionProfile.textContent = res.about;
    })
    .catch(res => console.log(res));
}

// function handleProfileEditFormSubmit(evt) {
//   evt.preventDefault();
//   constants.cardConfig.owner.name = constants.nameInput.value;
//   constants.cardConfig.owner.about = constants.jobInput.value
//   constants.buttonSubmitInfo.textContent = 'Сохранение...';
//   patchUser(constants.cardConfig.owner)
//     .then(() => {
//       closePopup(constants.popupInfo);
//       constants.nameProfile.textContent = constants.nameInput.value;
//       constants.professionProfile.textContent = constants.jobInput.value;
//     })
//     .catch(err => console.log(err))
//     .finally(() => constants.buttonSubmitInfo.textContent = 'Сохранить');
// };

// function handleCreatCardFromSubmit(evt) {
//   evt.preventDefault();
//   constants.cardConfig.name = constants.popupImageName.value;
//   constants.cardConfig.link = constants.popupImageUrl.value;
//   constants.buttonSubmitCard.textContent = 'Создание...';
//   creatNewCard(constants.cardConfig.name, constants.cardConfig.link)
//     .then(cardData => {
//       appendCard(createCard(cardData));
//       closePopup(constants.popupCard);
//       constants.formPopupCard.reset();
//     })
//     .catch(err => console.log(err))
//     .finally(() => constants.buttonSubmitCard.textContent = 'Создать');

// };

function handleAvatarEditSubmit(evt) {
  evt.preventDefault();
  constants.cardConfig.owner.avatar = `${constants.popupAvatarUrl.value}`;
  constants.buttonSubmitAvatar.textContent = 'Создание...';
  patchUserAvatar(constants.cardConfig.owner)
    .then(() => {
      popupAva.closePopup();
      constants.avatarImage.src = constants.popupAvatarUrl.value;
    })
    .catch(err => console.log(err))
    .finally(() => constants.buttonSubmitAvatar.textContent = 'Создать');

}

// constants.formPopupInfo.addEventListener('submit', handleProfileEditFormSubmit);
// constants.formPopupCard.addEventListener('submit', handleCreatCardFromSubmit);
// constants.formPopupAvatar.addEventListener('submit', handleAvatarEditSubmit);

// constants.openButtonPopupCard.addEventListener('click', () => {
//   openPopup(constants.popupCard);
//   formValidCard.clearValidationFrom();
// });

// constants.openButtonPopupInfo.addEventListener('click', () => {
//   openPopup(constants.popupInfo);
//   constants.nameInput.value = constants.nameProfile.textContent;
//   constants.jobInput.value = constants.professionProfile.textContent;
//   formValidProfile.clearValidationFrom();
// });
// constants.openButtonPopupAvatar.addEventListener('click', () => {
//   popupAva.openPopup()
//   constants.popupAvatarUrl.value = constants.avatarImage.src;
//   formValidAvatar.clearValidationFrom();
// })

const configApi = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-12',
  headers: {
    authorization: 'ae6caf2d-a00b-4726-a9ec-c3ff5914df0b',
    'Content-Type': 'application/json' 
  }
}
const api = new Api(configApi);


Promise.all([api.getUser(), api.getCards()])
  .then(([user, cards]) => {
    constants.nameProfile.textContent = user.name;
    constants.professionProfile.textContent = user.about;
    constants.avatarImage.src = user.avatar;
    userId = user._id;
    const sec = new Section({items: cards, renderer: renderer}, '.cards__list')
    sec.rendererItems()
  })
  .catch(err => console.log(err))


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
  openPopup(constants.popupDeleteCard);
  constants.popupDeleteCard.dataset.id = id;
}


const popupImageClass = new PopupWithImage('#popup_image');

function openPopupCard(name, link) {
  popupImageClass.openPopup(name, link)
}

function renderer(item) {
  const card = new Card(item, userId, handelLikeCard, deleteCard, openPopupCard);
  return card.createCard()
}