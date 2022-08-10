export default class FormValidator {
  constructor(data, form) {
    this._data = data;
    this._form = form;
    this._inputList = [...this._form.querySelectorAll(this._data.inputSelector)];
    this._buttonElement = this._form.querySelector(this._data.submitButtonSelector);
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement) {
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    this._errorElement.classList.add(this._data.errorClass);
    inputElement.classList.add(this._data.inputErrorClass)
    this._errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement) {
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    this._errorElement.classList.remove(this._data.errorClass);
    inputElement.classList.remove(this._data.inputErrorClass);
    this._errorElement.textContent = '';
  }

  _hasInvalidInput() {
    return this._inputList.some(input => !input.validity.valid)
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._data.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._data.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListener() {
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleButtonState();
      });
    });
    this._toggleButtonState();
  }

  enableValidation() {
    this._setEventListener();
  }

  _resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach(input => {
      this._hideInputError(input)
    });
  }

  clearValidationFrom() {
    this._form.reset();
    this._resetValidation();
  }
}