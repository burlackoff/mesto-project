export default class Popup {
  static _body = document.querySelector('body');

  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._button = this._popup.document.querySelector('popup__button');
  }

  openPopup() {
    Popup._body.style.overflow = 'hidden';
    this._popup.classList.add('popup_opened');
  }

  closePopup() {
    Popup._body.style.overflow = 'auto';
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.closePopup();
    }
  }

  _handleOverlayClose(event) {
    if (event.target === this._popup) {
      this.closePopup()
    }
  }

  setEventListener() {
    this._button.addEventListener('click', (event) => this._handleEscClose(event));
    this._popup.addEventListener('click', (event) => this._handleOverlayClose(event));
  }

  deleteEventListener() {

  }
}