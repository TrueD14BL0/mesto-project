import '../styles/index.css';
import { initPopups } from './modal';

import { enableValidation } from './validate';
import { initProfile } from './profile';

(function initSiteElements(){
  initProfile();

  initPopups();
  enableValidation({
    formSelector: '.form',
    inputSelector: '.form__text-input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'form__text-input_error',
    errorClass: 'form__span_active'
  });
})();
