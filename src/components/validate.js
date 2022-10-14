import { getInputListFromForm, getSubmitFromForm } from './utils'

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '\xa0';
};

const getErrorMessage = (inputElement)=>{
  let validationMessage;
  if(inputElement.validity.patternMismatch){
    validationMessage = inputElement.dataset.customError;
  }else{
    validationMessage = inputElement.validationMessage;
  }
  return validationMessage;
}

const isValid = (formElement, inputElement, initObj) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, getErrorMessage(inputElement), initObj.inputErrorClass, initObj.errorClass);
  } else {
    hideInputError(formElement, inputElement, initObj.inputErrorClass, initObj.errorClass );
  }
};

const hasInvalidInput = (inputList) => {
  return Array.from(inputList).some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

export const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const setEventListeners = (formElement, initObj) => {
  const inputList = getInputListFromForm(formElement, initObj.inputSelector);
  const buttonElement = getSubmitFromForm(formElement, initObj.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, initObj);
      toggleButtonState(inputList, buttonElement, initObj.inactiveButtonClass);
    });
  });
};

export const enableValidation = (initObj) => {
  const formList = document.querySelectorAll(initObj.formSelector);
  formList.forEach((formElement) => {
    setEventListeners(formElement, initObj);
  });
};
