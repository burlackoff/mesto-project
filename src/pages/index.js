import * as constants from '../components/utils.js'
import Api from '../components/api.js'
import Card from '../components/card_new.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import Popup from '../components/Popup.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithDeleteCard from '../components/PopupWithDeleteCard.js'
import './index.css';


let userId = '';
const formValidAvatar = new FormValidator(constants.valueConfig, constants.formPopupAvatar);
const formValidCard = new FormValidator(constants.valueConfig, constants.formPopupCard);
const formValidProfile = new FormValidator(constants.valueConfig, constants.formPopupInfo);
const section = new Section(renderer, '.cards__list');


[formValidAvatar, formValidCard, formValidProfile].forEach(form => form.enableValidation())

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
    section.rendererItems(cards)
  })
  .catch(err => console.log(err))


const popupItem = new PopupWithForm('#popup_info', handleSubmitUser);
const popupCard = new PopupWithForm('#popup_card', handleSubmitCard)
const popupImageClass = new PopupWithImage('#popup_image');
const popupDeleteCard = new PopupWithDeleteCard('#popup_delete-card', submitDeleteCard)
popupImageClass.setEventListener();
popupCard.setEventListener();
popupItem.setEventListener();
popupDeleteCard.setEventListener();

const userInfo = new UserInfo({name: '.profile__name', about: '.profile__profession'})
userInfo.getUserinfo()

constants.openButtonPopupCard.addEventListener('click', () => {
    popupCard.openPopup();
    formValidCard.clearValidationFrom();
  });


function handleSubmitUser({nameProfile, professionProfile}) {
  constants.cardConfig.owner.name = nameProfile;
  constants.cardConfig.owner.about = professionProfile;

  api.patchUser(constants.cardConfig.owner)
    .then((res) => {
      this.closePopup()
      constants.nameProfile.textContent = res.name;
      constants.professionProfile.textContent = res.about;
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

// function handleAvatarEditSubmit(evt) {
//   evt.preventDefault();
//   constants.cardConfig.owner.avatar = `${constants.popupAvatarUrl.value}`;
//   constants.buttonSubmitAvatar.textContent = 'Создание...';
//   patchUserAvatar(constants.cardConfig.owner)
//     .then(() => {
//       popupAva.closePopup();
//       constants.avatarImage.src = constants.popupAvatarUrl.value;
//     })
//     .catch(err => console.log(err))
//     .finally(() => constants.buttonSubmitAvatar.textContent = 'Создать');

// }

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