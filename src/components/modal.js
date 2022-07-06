import {popupImage, popupCard, popupInfo, popupAvatar, closeButtonPopupAvatar, closeButtonPopupImage, closeButtonPopupCard, closeButtonPopupInfo, valueConfig, closeButtonPopupDeleteCard, popupDeleteCard} from './utils.js'
import {clearValidationFrom} from './validate.js'

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

closeButtonPopupImage.addEventListener('click', () => closePopup(popupImage));
closeButtonPopupCard.addEventListener('click', () => {
  closePopup(popupCard);
  clearValidationFrom(popupCard, valueConfig);
});
closeButtonPopupInfo.addEventListener('click', () => {
  closePopup(popupInfo);
  clearValidationFrom(popupInfo, valueConfig);
});
closeButtonPopupAvatar.addEventListener('click', () => {
  closePopup(popupAvatar);
  clearValidationFrom(popupAvatar, valueConfig)
})
closeButtonPopupDeleteCard.addEventListener('click', () => closePopup(popupDeleteCard));