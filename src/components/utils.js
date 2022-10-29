import { toggleButtonState } from './validate'

export function getInputListFromForm(form, selector){
  return form.querySelectorAll(selector);
}

export function getSubmitFromForm(form, selector){
  return form.querySelector(selector);
}

export function addFormKeyDownListenerHandler(evt) {
  const inputList = getInputListFromForm(evt.target, '.form__text-input');
  if(!inputList){
    this.submit();
  }
}

export function callToggleButton(form){
  toggleButtonState(getInputListFromForm(form, '.form__text-input'), getSubmitFromForm(form, '.form__button'), 'popup__button_disabled');
}
