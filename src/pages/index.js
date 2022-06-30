import {initialCards, formPopupInfo, formPopupCard, openButtonPopupCard, openButtonPopupInfo, popupInfo, popupCard, nameProfile, professionProfile, nameInput, jobInput, listCards, popupImageName, popupImageUrl, valueConfig} from '../components/utils.js'
import {createCard} from '../components/card.js'
import {enableValidation, clearValidationFrom} from '../components/validate.js'
import {closePopup, openPopup} from '../components/modal.js'

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
  closePopup(popupInfo);
};

function handleCreatCardFromSubmit(evt) {
  evt.preventDefault();
  appendCard(createCard(popupImageName.value, popupImageUrl.value)); //Вставка карточки
  closePopup(popupCard);
  formPopupCard.reset(); //Обнуление формы модалки создания карточки
};

renderInitialCards(initialCards); //Рендеринг стартовых карточек
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


fetch('https://nomoreparties.co/v1/plus-cohort-12/cards', {
  headers: {
    authorization: 'ae6caf2d-a00b-4726-a9ec-c3ff5914df0b'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });

// GET 

fetch('https://nomoreparties.co/v1/plus-cohort-12/users/me', {
  headers: {
    authorization: 'ae6caf2d-a00b-4726-a9ec-c3ff5914df0b'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });