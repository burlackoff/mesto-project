export default class FormValidator {
  constructor(data, form) {
    this._data = data;
    this._form = form;
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    this._errorElement.classList.add(this._data.errorClas);
    this._errorElement.textContent = errorMessage;
    inputElement.classList.add(this._data.inputErrorClass)
  }

  _hideInputError(inputElement) {
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    this._errorElement.classList.remove(this._data.errorClass);
    inputElement.classList.remove(this._data.inputErrorClass);
  }

  _hasInvalidInput(inputlist) {
    return inputlist.some(input => !input.validity.valid)
  }

  _toggleButtonState(inputList, button) {
    if (this._hasInvalidInput(inputList)) {
      button.classList.add(this._data.inactiveButtonClass);
      button.setAttribute('disabled', 'disabled')
    } else {
      button.classList.remove(this._data.inactiveButtonClass);
      button.removeAttribute('disabled');
    }
  }

  _setEventListener() {
    this._inputElements = this._form.querySelectorAll(this._data.inputSelector);
    this._buttonElement = this._form.querySelector(this._data.submitButtonSelector);
    this._inputList = Array.from(this._inputElements);

    this._toggleButtonState(this._inputList, this._buttonElement)

    this._inputElements.forEach(input => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleButtonState(this._inputList, this._buttonElement);
      })
    })
  }

  enableValidation() {
    this._formElements = this._form.querySelector(this._data.formSelector);
    this._formElements.forEach(formElement => {
      formElement.addEventListener('submit', evt => {
        evt.preventDefault()
      })

      this._setEventListener()
    })
  }
}