import {formPopupInfo, formPopupCard, formPopupAvatar, openButtonPopupCard, openButtonPopupInfo, openButtonPopupAvatar, popupInfo, popupCard, popupAvatar, nameProfile, professionProfile, nameInput, jobInput, listCards, popupImageName, popupImageUrl, popupAvatarUrl, valueConfig, cardConfig, avatarImage, buttonSubmitInfo, buttonSubmitCard, buttonSubmitAvatar} from '../components/utils.js'
import {createCard} from '../components/card.js'
import {enableValidation, clearValidationFrom} from '../components/validate.js'
import {closePopup, openPopup} from '../components/modal.js'
import {getCards, getUser, patchUser, creatNewCard, patchUserAvatar} from '../components/api.js'
import './index.css';

function appendCard(card) {
  listCards.prepend(card);
}

function renderInitialCards(arrayCard) {
  arrayCard.forEach(item => appendCard(createCard(item)));
};

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();
  cardConfig.owner.name = nameInput.value;
  cardConfig.owner.about = jobInput.value
  buttonSubmitInfo.textContent = 'Сохранение...';
  patchUser(cardConfig.owner)
    .then(() => {
      closePopup(popupInfo);
      nameProfile.textContent = nameInput.value;
      professionProfile.textContent = jobInput.value;
    })
    .catch(err => console.log(err))
    .finally(() => buttonSubmitInfo.textContent = 'Сохранить');
};

function handleCreatCardFromSubmit(evt) {
  evt.preventDefault();
  cardConfig.name = popupImageName.value;
  cardConfig.link = popupImageUrl.value;
  buttonSubmitCard.textContent = 'Создание...';
  creatNewCard(cardConfig.name, cardConfig.link)
    .then(cardData => {
      appendCard(createCard(cardData))
      closePopup(popupCard);
      formPopupCard.reset();
    })
    .catch(err => console.log(err))
    .finally(() => buttonSubmitCard.textContent = 'Создать');
 
};

function handleAvatarEditSubmit(evt) {
  evt.preventDefault();
  cardConfig.owner.avatar = `${popupAvatarUrl.value}`;
  buttonSubmitAvatar.textContent = 'Создание...';
  patchUserAvatar(cardConfig.owner)
    .then(() => closePopup(popupAvatar))
    .catch(err => console.log(err))
    .finally(() => buttonSubmitAvatar.textContent = 'Создать');
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
Promise.all([getUser(), getCards()])
  .then(([user, cards]) => {
    nameProfile.textContent = user.name;
    professionProfile.textContent = user.about;
    avatarImage.src = user.avatar;
    renderInitialCards(cards)
  })
  .catch(err => console.log(err))
