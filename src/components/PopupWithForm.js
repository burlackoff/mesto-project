import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, submit) {
    super(selector);
    this._submit = submit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');
    this._buttonSubmit = this._form.querySelector('.popup__submit');
    this._buttonSubmitText = this._buttonSubmit.textContent;
  }

  rendererLoading(isLoading, loadingText='Сохранение...') {
    isLoading === true 
    ? this._buttonSubmit.textContent = loadingText 
    : this._buttonSubmit.textContent = this._buttonSubmitText;
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputs.forEach(input => {
      this._inputValues[input.name] = input.value;
    })
    return this._inputValues;
  }

  setInputValues(data) {
    this._inputs.forEach(input => {
      input.value = data[input.name];
    })
  }

  setEventListener() {
    super.setEventListener()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues());
      this.closePopup();
    })
  }

  closePopup() {
    super.closePopup();
    this._form.reset()
  }
}