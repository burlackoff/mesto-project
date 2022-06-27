function isValid(formElement, inputElement, valueConfig) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, valueConfig);
  } else {
    hideInputError(formElement, inputElement, valueConfig);
  }
}

function showInputError(formElement, inputElement, errorMessage, valueConfig) {
  const {errorClass, inputErrorClass} = valueConfig;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(inputErrorClass);
}

function hideInputError(formElement, inputElement, valueConfig) {
  const {errorClass, inputErrorClass} = valueConfig;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(errorClass);
  inputElement.classList.remove(inputErrorClass);
}

function setEventListener(formElement, valueConfig) {
  const {inputSelector, submitButtonSelector} = valueConfig;
  const inputElements = formElement.querySelectorAll(inputSelector);
  const buttonElement = formElement.querySelector(submitButtonSelector);
  const inputList = Array.from(inputElements);

  toggleButtonState(inputList, buttonElement, valueConfig);

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, valueConfig);
      toggleButtonState(inputList, buttonElement, valueConfig);
    })
  })
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement, valueConfig) {
  const {inactiveButtonClass} = valueConfig;
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

export function enableValidation(valueConfig) {
  const {formSelector} = valueConfig;
  const formElements = document.querySelectorAll(formSelector);
  formElements.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    })

    setEventListener(formElement, valueConfig);
  })
}

export function clearValidationFrom(popup, valueConfig) {
  const {formSelector, inputSelector, submitButtonSelector, errorClass, inputErrorClass, inactiveButtonClass} = valueConfig;
  const formElement = popup.querySelector(formSelector);
  const inputElements = formElement.querySelectorAll(inputSelector);
  const buttonElement = formElement.querySelector(submitButtonSelector);
  
  inputElements.forEach((input) => {
    const errorMessage = formElement.querySelector(`.${input.id}-error`);
    errorMessage.classList.remove(errorClass);
    input.classList.remove(inputErrorClass);
  });
  buttonElement.classList.add(inactiveButtonClass);
}