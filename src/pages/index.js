import * as constants from '../components/utils.js'
import { createCard } from '../components/card.js'
import { enableValidation, clearValidationFrom } from '../components/validate.js'
import { closePopup, openPopup } from '../components/modal.js'
import { Api } from '../components/api.js'
import Card from '../components/card_new.js'
import './index.css';

let userId = '';

function appendCard(card) {
  constants.listCards.prepend(card);
}

function renderInitialCards(arrayCard) {
  arrayCard.reverse().forEach(item => {
    const card = new Card(item, '#template_card', userId, handelLikeCard, deleteCard, openPopupCard)
    appendCard(card.createCard())
  });
};

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();
  constants.cardConfig.owner.name = nameInput.value;
  constants.cardConfig.owner.about = jobInput.value
  constants.buttonSubmitInfo.textContent = 'Сохранение...';
  patchUser(constants.cardConfig.owner)
    .then(() => {
      closePopup(popupInfo);
      constants.nameProfile.textContent = nameInput.value;
      constants.professionProfile.textContent = jobInput.value;
    })
    .catch(err => console.log(err))
    .finally(() => constants.buttonSubmitInfo.textContent = 'Сохранить');
};

function handleCreatCardFromSubmit(evt) {
  evt.preventDefault();
  constants.cardConfig.name = constants.popupImageName.value;
  constants.cardConfig.link = constants.popupImageUrl.value;
  constants.buttonSubmitCard.textContent = 'Создание...';
  creatNewCard(constants.cardConfig.name, constants.cardConfig.link)
    .then(cardData => {
      appendCard(createCard(cardData));
      closePopup(constants.popupCard);
      constants.formPopupCard.reset();
    })
    .catch(err => console.log(err))
    .finally(() => constants.buttonSubmitCard.textContent = 'Создать');

};

function handleAvatarEditSubmit(evt) {
  evt.preventDefault();
  constants.cardConfig.owner.avatar = `${constants.popupAvatarUrl.value}`;
  constants.buttonSubmitAvatar.textContent = 'Создание...';
  patchUserAvatar(constants.cardConfig.owner)
    .then(() => {
      closePopup(constants.popupAvatar);
      constants.avatarImage.src = constants.popupAvatarUrl.value;
    })
    .catch(err => console.log(err))
    .finally(() => buttonSubmitAvatar.textContent = 'Создать');

}

constants.formPopupInfo.addEventListener('submit', handleProfileEditFormSubmit);
constants.formPopupCard.addEventListener('submit', handleCreatCardFromSubmit);
constants.formPopupAvatar.addEventListener('submit', handleAvatarEditSubmit);

constants.openButtonPopupCard.addEventListener('click', () => {
  openPopup(constants.popupCard);
  clearValidationFrom(constants.popupCard, constants.valueConfig);
});

constants.openButtonPopupInfo.addEventListener('click', () => {
  openPopup(constants.popupInfo);
  constants.nameInput.value = nameProfile.textContent;
  constants.jobInput.value = professionProfile.textContent;
  clearValidationFrom(constants.popupInfo, constants.valueConfig);
});
constants.openButtonPopupAvatar.addEventListener('click', () => {
  openPopup(popupAvatar);
  popupAvatarUrl.value = avatarImage.src;
  clearValidationFrom(constants.popupAvatar, valueConfig);
})

enableValidation(constants.valueConfig);

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
    renderInitialCards(cards);
  })
  .catch(err => console.log(err))


const handelLikeCard = (like, id, countLikes) => {
  if (like.classList.contains('card__like-button_active')) {
    api.deleteLike(id)
      .then(res => {
        countLikes.textContent = res.likes.length;
        like.classList.remove('card__like-button_active');
      })
      .catch(err => console.log(err));
  } else if (!like.classList.contains('card__like-button_active')) {
    api.putLike(id)
      .then(res => {
        countLikes.textContent = res.likes.length;
        like.classList.add('card__like-button_active');
      })
      .catch(err => console.log(err));
  }
}

const deleteCard = (id) => {
  openPopup(constants.popupDeleteCard);
  constants.popupDeleteCard.dataset.id = id;
}

const openPopupCard = (name, link) => {
  openPopup(constants.popupImage);
  constants.imageClick.src = link;
  constants.imageClick.alt = name;
  constants.imageSubtitle.textContent = name;
}