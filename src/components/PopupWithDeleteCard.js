import Popup from "./Popup";

export default class PopupWithDeleteCard extends Popup {
  constructor(selector, submit) {
    super(selector);
    this._submit = submit;
    this._form = this._popup.querySelector('.popup__form');
  }

  openPopup(id) {
    super.openPopup()
    this._popup.dataset.id = id;
  }

  setEventListener() {
    super.setEventListener()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit(this._popup.dataset.id)
    })
  }

  closePopup() {
    super.closePopup()
    this._popup.dataset.id = '';
  }
}