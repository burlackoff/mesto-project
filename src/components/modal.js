import {popupImage, popupCard, popupInfo, popupAvatar, closeButtonPopupAvatar, closeButtonPopupImage, closeButtonPopupCard, closeButtonPopupInfo, valueConfig, closeButtonPopupDeleteCard, popupDeleteCard, popups} from './utils.js'

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

popups.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__button')) {
      closePopup(popup)
    }
  })
})