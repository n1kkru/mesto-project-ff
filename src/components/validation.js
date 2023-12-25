/*{
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: '.popup__input-error',
  errorClass: '.popup__message-error-active'
}*/

const clearValidation = (formElem, config) => {
  const inputList = Array.from(formElem.querySelectorAll(config.inputSelector));
  const buttonElement = formElem.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideError(config, formElem, inputElement);
    toggleButtonState(config, inputList, buttonElement);
  });
}

const hasValidInput = (inputList) => {
  return inputList.every((inputElement) => {
    return inputElement.validity.valid;
  });
}

const toggleButtonState = (formObject, inputList, buttonElement) => {
  if (hasValidInput(inputList)) {
    buttonElement.classList.remove(formObject.inactiveButtonClass);
    buttonElement.disabled = false;
  }
  else {
    buttonElement.classList.add(formObject.inactiveButtonClass);
    buttonElement.disabled = true;
  }
}

const showError = (formObject, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formObject.inputErrorClass); // красная линия ошибки
  errorElement.textContent = errorMessage;          // текст ошибки
  errorElement.classList.add(formObject.errorClass); // показать ошибку
};

const hideError = (formObject, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formObject.inputErrorClass); // красная линия ошибки
  errorElement.classList.remove(formObject.errorClass);
  errorElement.textContent = '';
};

// проверка валидности
const checkInputValidity = (formObject, formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showError(formObject, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideError(formObject, formElement, inputElement);
  }
};

// добавление слушателей
const setEventListeners = (formObject, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(formObject.inputSelector));
  const buttonElement = formElement.querySelector(formObject.submitButtonSelector);
  // toggleButtonState(formObject, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formObject, formElement, inputElement);
      toggleButtonState(formObject, inputList, buttonElement);
    });
  });
};

function enableValidation(formObject) {
  const formList = Array.from(document.querySelectorAll(formObject.formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    
    setEventListeners(formObject, formElement);
  });
}

export {clearValidation, enableValidation}