import {formPopupInfo, formPopupCard, formPopupAvatar, openButtonPopupCard, openButtonPopupInfo, openButtonPopupAvatar, popupInfo, popupCard, popupAvatar, nameProfile, professionProfile, nameInput, jobInput, listCards, popupImageName, popupImageUrl, popupAvatarUrl, valueConfig, cardConfig, avatarImage} from '../components/utils.js'
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
  nameProfile.textContent = nameInput.value;
  professionProfile.textContent = jobInput.value;
  cardConfig.owner.name = nameInput.value;
  cardConfig.owner.about = jobInput.value
  patchUser(cardConfig.owner)
  closePopup(popupInfo);  
};

function handleCreatCardFromSubmit(evt) {
  evt.preventDefault();
  cardConfig.name = popupImageName.value;
  cardConfig.link = popupImageUrl.value;
  creatNewCard(cardConfig.name, cardConfig.link);
  appendCard(createCard(cardConfig));
  closePopup(popupCard);
  formPopupCard.reset();
};

function handleAvatarEditSubmit(evt) {
  evt.preventDefault();
  cardConfig.owner.avatar = `${popupAvatarUrl.value}`;
  patchUserAvatar(cardConfig.owner);
  closePopup(popupAvatar);
  avatarImage.src = `${popupAvatarUrl.value}`;
}

enableValidation(valueConfig);
  
formPopupInfo.addEventListener('submit', handleProfileEditFormSubmit);
formPopupCard.addEventListener('submit', handleCreatCardFromSubmit);
formPopupAvatar.addEventListener('submit', handleAvatarEditSubmit);

openButtonPopupCard.addEventListener('click', () => {
  openPopup(popupCard);
  clearValidationFrom(popupCard, valueConfig);
});
//Обработчик открытия модалки редактирования профиля
openButtonPopupInfo.addEventListener('click', () => {
  openPopup(popupInfo);
  nameInput.value = nameProfile.textContent;
  jobInput.value = professionProfile.textContent;
  clearValidationFrom(popupInfo, valueConfig);
}); 
openButtonPopupAvatar.addEventListener('click', () => {
  openPopup(popupAvatar);
  getUser()
    .then(data => {
      popupAvatarUrl.value = data.avatar;
    })
  clearValidationFrom(popupAvatar, valueConfig);
})

getUser()
  .then(data => {
    nameProfile.textContent = data.name;
    professionProfile.textContent = data.about;
    avatarImage.src = data.avatar;
  })

getCards()
  .then(cards => renderInitialCards(cards));

getCards()
  .then(res => console.log(res));
