import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, submit) {
    super(selector);
    this._submit = submit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputs.forEach(input => {
      this._inputValues[`${input.id}`] = input.value;
    })
    return this._inputValues;
  }

  setEventListener() {
    super.setEventListener()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues())
      this.closePopup()
    })
  }

  closePopup() {
    super.closePopup();
    this._form.reset()
  }
}