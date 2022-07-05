import {formPopupInfo, formPopupCard, openButtonPopupCard, openButtonPopupInfo, popupInfo, popupCard, nameProfile, professionProfile, nameInput, jobInput, listCards, popupImageName, popupImageUrl, valueConfig, cardConfig} from '../components/utils.js'
import {createCard} from '../components/card.js'
import {enableValidation} from '../components/validate.js'
import {closePopup, openPopup} from '../components/modal.js'
import {getCards, getUser, patchUser, creatNewCard} from '../components/api.js'
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
  patchUser(nameInput.value, jobInput.value)
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

enableValidation(valueConfig);
  
formPopupInfo.addEventListener('submit', handleProfileEditFormSubmit);
formPopupCard.addEventListener('submit', handleCreatCardFromSubmit);
openButtonPopupCard.addEventListener('click', () => {
  openPopup(popupCard);
});
//Обработчик открытия модалки редактирования профиля
openButtonPopupInfo.addEventListener('click', () => {
  openPopup(popupInfo);
  nameInput.value = nameProfile.textContent;
  jobInput.value = professionProfile.textContent;
}); 

getUser()
  .then(data => {
    nameProfile.textContent = data.name;
    professionProfile.textContent = data.about;
  })

getCards()
  .then(cards => renderInitialCards(cards));

getCards()
  .then(res => console.log(res));
