import {initialCards, formPopupInfo, formPopupCard, openButtonPopupCard, openButtonPopupInfo, closeButtonPopupInfo, popupInfo, popupCard, nameProfile, professionProfile, nameInput, jobInput, listCards} from '../components/utils.js'
import {createCard} from '../components/card.js'
import {enableValidation} from '../components/validate.js'
import {closePopup, openPopup} from '../components/modal.js'

import './index.css';

function appendCard(card) {
  listCards.prepend(card);
}

function renderCard(arrayCard) {
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
  const popupImageName = popupCard.querySelector('.popup__input_name_image').value;
  const popupImageUrl = popupCard.querySelector('.popup__input_src_image').value;  
  appendCard(createCard(popupImageName, popupImageUrl)); //Вставка карточки
  closePopup(popupCard);
  formPopupCard.reset(); //Обнуление формы модалки создания карточки
};

renderCard(initialCards); //Рендеринг стартовых карточек
enableValidation()

formPopupInfo.addEventListener('submit', handleProfileEditFormSubmit); //Обработчик отправки формы редактирования профиля
formPopupCard.addEventListener('submit', handleCreatCardFromSubmit); //Обработчик отправки формы
openButtonPopupCard.addEventListener('click', () => openPopup(popupCard)); //Обработчик открытия модалки добавление карточки
//Обработчик открытия модалки редактирования профиля
openButtonPopupInfo.addEventListener('click', () => {
  openPopup(popupInfo);
  nameInput.value = nameProfile.textContent;
  jobInput.value = professionProfile.textContent;
}); 
closeButtonPopupInfo.addEventListener('click', () => closePopup(popupInfo)); //Обработчик закрытия модалки редактирования профиля