import { addCardToCards, createCard } from './card';
import { getInputListFromForm, getSubmitFromForm } from './utils'
import { toggleButtonState } from './validate'

const previewDescription = document.querySelector('.popup__description');
const previewImage = document.querySelector('.popup__picture');
export const previewPopup = document.querySelector('.popup_type_picture');
const popupAddNewPlaceForm = document.querySelector('.popup_type_add-form');
const formAddingNewPlace = document.querySelector('.form-new-place');
const buttonAddNewPlace = document.querySelector('.profile__add-button');
const placeNewNameInput = document.querySelector('.form-new-place__name');
const placeNewUrlInput = document.querySelector('.form-new-place__url');

function createCardNewFromAddForm(evt){
  evt.preventDefault();
  addCardToCards(createCard(placeNewNameInput.value, placeNewUrlInput.value));
}



function fillNewPlaceForm(){
  formAddingNewPlace.reset();
}



export function fillPreview(evt){
  evt.stopPropagation();
  const selectedCard = evt.target.closest('.card');
  const cardText = selectedCard.querySelector('.card__text').textContent;
  previewDescription.textContent = cardText;
  previewImage.src = selectedCard.querySelector('.card__image').src;
  previewImage.alt = cardText;
}
function addDocumentKeyListenerHandler(evt){
  if(evt.key=='Escape'){
    closePopup();
  };
}

function addDocumentMouseDownListenerHandler(evt) {
  if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')){
    closePopup();
  };
}

export function openPopup(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', addDocumentKeyListenerHandler);
  document.addEventListener('mousedown', addDocumentMouseDownListenerHandler);
}

export function closePopup(){
  const popup = document.querySelector('.popup_opened');
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', addDocumentKeyListenerHandler);
  document.removeEventListener('mousedown', addDocumentMouseDownListenerHandler);
}

export function addFormKeyDownListenerHandler(evt) {
  const inputList = getInputListFromForm(formAddingNewPlace, '.form__text-input');
  if(!inputList){
    this.submit();
  }
}

function initForms(){


  formAddingNewPlace.addEventListener('submit', (evt)=>{
    createCardNewFromAddForm(evt);
    closePopup();
  });
  formAddingNewPlace.addEventListener('keydown', (evt)=>addFormKeyDownListenerHandler);
}

export function callToggleButton(form){
  toggleButtonState(getInputListFromForm(form, '.form__text-input'), getSubmitFromForm(form, '.form__button'), 'popup__button_disabled');
}

export function initPopups(){
  initForms();
  buttonAddNewPlace.addEventListener('click', ()=>{
    openPopup(popupAddNewPlaceForm);
    fillNewPlaceForm();
    callToggleButton(popupAddNewPlaceForm);
  });
}
