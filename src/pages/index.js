import {formPopupInfo, formPopupCard, formPopupAvatar, openButtonPopupCard, openButtonPopupInfo, openButtonPopupAvatar, popupInfo, popupCard, popupAvatar, nameProfile, professionProfile, nameInput, jobInput, listCards, popupImageName, popupImageUrl, popupAvatarUrl, valueConfig, cardConfig, avatarImage} from '../components/utils.js'
import {createCard} from '../components/card.js'
import {enableValidation, clearValidationFrom} from '../components/validate.js'
import {closePopup, openPopup} from '../components/modal.js'
import {getCards, getUser, patchUser, creatNewCard, patchUserAvatar} from '../components/api.js'
import './index.css';

const promiseGetUser = getUser()
  .then(data => {
    nameProfile.textContent = data.name;
    professionProfile.textContent = data.about;
    avatarImage.src = data.avatar;
  })

const promiseGetCards = getCards()
  .then(cards => renderInitialCards(cards));

function appendCard(card) {
  listCards.prepend(card);
}

function renderInitialCards(arrayCard) {
  arrayCard.forEach(item => appendCard(createCard(item)));
};

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  professionProfile.textContent = jobInput.value;
  cardConfig.owner.name = nameInput.value;
  cardConfig.owner.about = jobInput.value
  const buttonSubmit = this.querySelector('.popup__submit');
  buttonSubmit.textContent = 'Сохранение...';
  patchUser(cardConfig.owner)
    .then(() => closePopup(popupInfo))
    .finally(() => buttonSubmit.textContent = 'Сохранить');
};

function handleCreatCardFromSubmit(evt) {
  evt.preventDefault();
  cardConfig.name = popupImageName.value;
  cardConfig.link = popupImageUrl.value;
  const buttonSubmit = this.querySelector('.popup__submit');
  buttonSubmit.textContent = 'Создание...';
  creatNewCard(cardConfig.name, cardConfig.link)
    .then(cardData => {
      appendCard(createCard(cardData))
      closePopup(popupCard);
    })
    .finally(() => buttonSubmit.textContent = 'Создать');
  formPopupCard.reset();
};

function handleAvatarEditSubmit(evt) {
  evt.preventDefault();
  cardConfig.owner.avatar = `${popupAvatarUrl.value}`;
  const buttonSubmit = this.querySelector('.popup__submit');
  buttonSubmit.textContent = 'Создание...';
  patchUserAvatar(cardConfig.owner)
    .then(() => closePopup(popupAvatar))
    .finally(() => buttonSubmit.textContent = 'Создать');
  avatarImage.src = popupAvatarUrl.value;
}
  
formPopupInfo.addEventListener('submit', handleProfileEditFormSubmit);
formPopupCard.addEventListener('submit', handleCreatCardFromSubmit);
formPopupAvatar.addEventListener('submit', handleAvatarEditSubmit);

openButtonPopupCard.addEventListener('click', () => {
  openPopup(popupCard);
  clearValidationFrom(popupCard, valueConfig);
});

openButtonPopupInfo.addEventListener('click', () => {
  openPopup(popupInfo);
  nameInput.value = nameProfile.textContent;
  jobInput.value = professionProfile.textContent;
  clearValidationFrom(popupInfo, valueConfig);
}); 
openButtonPopupAvatar.addEventListener('click', () => {
  openPopup(popupAvatar);
  popupAvatarUrl.value = avatarImage.src;
  clearValidationFrom(popupAvatar, valueConfig);
})

enableValidation(valueConfig);
Promise.all([promiseGetUser, promiseGetCards])
