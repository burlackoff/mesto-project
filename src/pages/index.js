import {formPopupInfo, formPopupCard, openButtonPopupCard, openButtonPopupInfo, popupInfo, popupCard, nameProfile, professionProfile, nameInput, jobInput, listCards, popupImageName, popupImageUrl, valueConfig} from '../components/utils.js'
import {createCard} from '../components/card.js'
import {enableValidation, clearValidationFrom} from '../components/validate.js'
import {closePopup, openPopup} from '../components/modal.js'
import {getCards, getUser, patchUser} from '../components/api.js'
import './index.css';

function appendCard(card) {
  listCards.prepend(card);
}

function renderInitialCards(arrayCard) {
  arrayCard.forEach(item => appendCard(createCard(item.name, item.link)));
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
  appendCard(createCard(popupImageName.value, popupImageUrl.value)); //Вставка карточки
  closePopup(popupCard);
  formPopupCard.reset(); //Обнуление формы модалки создания карточки
};


enableValidation(valueConfig);
  
formPopupInfo.addEventListener('submit', handleProfileEditFormSubmit); //Обработчик отправки формы редактирования профиля
formPopupCard.addEventListener('submit', handleCreatCardFromSubmit); //Обработчик отправки формы
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


getUser()

getCards()
  .then(res => renderInitialCards(res))
