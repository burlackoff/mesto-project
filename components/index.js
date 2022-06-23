import {initialCards, renderCard} from './card.js';
import {openPopup, closePopup, handleProfileEditFormSubmit, handleCreatCardFromSubmit} from './modal.js';
import {enableValidation, isValid} from './validate.js';
import {formPopupInfo, closeButtonPopupImage, formPopupCard, openButtonPopupCard, closeButtonPopupCard, openButtonPopupInfo, nameInput, jobInput, nameProfile, professionProfile, closeButtonPopupInfo} from './data.js';

 
renderCard(initialCards); //Рендеринг стартовых карточек
enableValidation()


formPopupInfo.addEventListener('submit', handleProfileEditFormSubmit); //Обработчик отправки формы редактирования профиля
closeButtonPopupImage.addEventListener('click', () => closePopup(document.querySelector('#popup_image'))); //Добавление обработчика закрытие модалки просмотра картинки
formPopupCard.addEventListener('submit', handleCreatCardFromSubmit); //Обработчик отправки формы
openButtonPopupCard.addEventListener('click', () => openPopup(document.querySelector('#popup_card'))); //Обработчик открытия модалки добавление карточки
closeButtonPopupCard.addEventListener('click', () => closePopup(document.querySelector('#popup_card'))); //Обработчик закрытия модалки добавление карточки
//Обработчик открытия модалки редактирования профиля
openButtonPopupInfo.addEventListener('click', () => {
  openPopup(document.querySelector('#popup_info'))
  nameInput.value = nameProfile.textContent;
  jobInput.value = professionProfile.textContent;
  isValid(document.querySelector('#popup_info'), nameInput)
  enableValidation()
}); 
closeButtonPopupInfo.addEventListener('click', () => closePopup(document.querySelector('#popup_info'))); //Обработчик закрытия модалки редактирования профиля