export default class Popup {
  static _body = document.querySelector('body');

  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._button = this._popup.querySelector('.popup__button');
  }

  openPopup() {
    Popup._body.style.overflow = 'hidden';
    this._popup.classList.add('popup_opened');
    this._setDefaultEventListeners();
  }

  closePopup() {
    Popup._body.style.overflow = 'auto';
    this._popup.classList.remove('popup_opened');
    this._deleteDefaultEventListeners()
  }

  _handleEscClose = (event) => {
    if (event.key === 'Escape') {
      this.closePopup();
    }
  }

  _handleOverlayClose = (event) => {
    if (event.target === this._popup) {
      this.closePopup()
    }
  }

  _setDefaultEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('mousedown', this._handleOverlayClose);
  }

  _deleteDefaultEventListeners() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('mousedown', this._handleOverlayClose);
  }

  setEventListener() {
    this._button.addEventListener('click', () => this.closePopup())
  }
}