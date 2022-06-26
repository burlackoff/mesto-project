import {popupCard, popupInfo, formPopupCard, nameProfile, professionProfile, nameInput, jobInput} from './data.js';
import {appendCard, creatCard} from './card.js'
import {enableValidation, isValid} from './validate.js';

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escClose)
  popup.addEventListener('click', overlayClose)
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escClose);
  popup.removeEventListener('click', overlayClose);
}

function escClose(event) {
  if (event.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'))
  }
}

function overlayClose(event) {
  const popup = document.querySelector('.popup_opened')
  if (event.target === popup) {
    closePopup(popup)
  }
}

export function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  professionProfile.textContent = jobInput.value;
  closePopup(popupInfo);
};

export function handleCreatCardFromSubmit(evt) {
  evt.preventDefault();
  const popupImageName = popupCard.querySelector('.popup__input_name_image').value;
  const popupImageUrl = popupCard.querySelector('.popup__input_src_image').value;  
  appendCard(creatCard(popupImageName, popupImageUrl)); //Вставка карточки
  closePopup(popupCard);
  formPopupCard.reset(); //Обнуление формы модалки создания карточки
  enableValidation();
};