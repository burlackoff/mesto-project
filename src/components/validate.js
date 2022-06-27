function isValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add('popup__error_active');
  errorElement.textContent = errorMessage;
  inputElement.classList.add('popup__input_type_error');
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove('popup__error_active');
  inputElement.classList.remove('popup__input_type_error');
}

function setEventListener(formElement) {
  const inputElements = formElement.querySelectorAll('.popup__input');
  const buttonElement = formElement.querySelector('.popup__submit');
  const inputList = Array.from(inputElements);

  toggleButtonState(inputList, buttonElement);

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    })
  })
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit_disabled');
  } else {
    buttonElement.classList.remove('popup__submit_disabled');
  }
}

export function enableValidation() {
  const formElements = document.querySelectorAll('.form');
  formElements.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    })

    setEventListener(formElement);
  })
}

export function clearValidationFrom(popup) {
  const formElement = popup.querySelector('.form');
  const inputElements = formElement.querySelectorAll('.popup__input');
  const buttonElement = formElement.querySelector('.popup__submit');
  
  inputElements.forEach((input) => {
    const errorMessage = formElement.querySelector(`.${input.id}-error`);
    errorMessage.classList.remove('popup__error_active');
    input.classList.remove('popup__input_type_error');
  });
  buttonElement.classList.add('popup__submit_disabled');
}