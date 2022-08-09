export const popupInfo = document.querySelector('#popup_info');
export const formPopupInfo = popupInfo.querySelector('.popup__form');
export const buttonSubmitInfo = popupInfo.querySelector('.popup__submit');
export const openButtonPopupInfo = document.querySelector('.profile__edit');
export const popupCard = document.querySelector('#popup_card');
export const openButtonPopupCard = document.querySelector('.profile__add');
export const formPopupCard = popupCard.querySelector('.popup__form');
export const popupImage = document.querySelector('#popup_image');
export const popupAvatar = document.querySelector('#popup_avatar');
export const openButtonPopupAvatar = document.querySelector('.profile__avatar-edit');
export const formPopupAvatar = popupAvatar.querySelector('.popup__form');
export const popupDeleteCard = document.querySelector('#popup_delete-card');
export const formPopupDeleteCard = popupDeleteCard.querySelector('.popup__form');

export const valueConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
}

export const configApi = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-12',
  headers: {
    authorization: 'ae6caf2d-a00b-4726-a9ec-c3ff5914df0b',
    'Content-Type': 'application/json' 
  }
}