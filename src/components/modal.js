import { addCardToCards, createCard } from './card';

const previewDescription = document.querySelector('.popup__description');
const previewImage = document.querySelector('.popup__picture');
export const previewPopup = document.querySelector('.popup_type_picture');
const popupEditForm = document.querySelector('.popup_type_edit-form');
const popupAddNewPlaceForm = document.querySelector('.popup_type_add-form');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const formProfileEdit = document.querySelector('.form-profile-edit');
const formAddingNewPlace = document.querySelector('.form-new-place');
const profileEditNameInput = document.querySelector('.form-profile-edit__name');
const profileEditJobInput = document.querySelector('.form-profile-edit__job');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddNewPlace = document.querySelector('.profile__add-button');
const placeNewNameInput = document.querySelector('.form-new-place__name');
const placeNewUrlInput = document.querySelector('.form-new-place__url');

function createcardNewFromAddForm(evt){
  evt.preventDefault();
  addCardToCards(createCard(placeNewNameInput.value, placeNewUrlInput.value));
}

function fillEditForm(){
  profileEditNameInput.value = profileName.textContent;
  profileEditJobInput.value = profileJob.textContent;
}

function fillNewPlaceForm(){
  formProfileEdit.reset();
}

function saveProfileData(evt){
  evt.preventDefault();
  profileName.textContent = profileEditNameInput.value;
  profileJob.textContent = profileEditJobInput.value;
}

export function fillPreview(evt){
  evt.stopPropagation();
  const selectedCard = evt.target.closest('.card');
  const cardText = selectedCard.querySelector('.card__text').textContent;
  previewDescription.textContent = cardText;
  previewImage.src = selectedCard.querySelector('.card__image').src;
  previewImage.alt = cardText;
}

export function openPopup(popup){
  popup.classList.add('popup_opened');
}

function closePopup(){
  const popup = document.querySelector('.popup_opened');
  popup.classList.remove('popup_opened');
}

function documentKeyListenerHandler(evt){
  if(evt.key=='Escape'){
    closePopup();
  };
}

function documentMouseDownListenerHandler(evt) {
  if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')){
    closePopup();
  };
}

function initForms(){
  formProfileEdit.addEventListener('submit', (evt)=>{
      saveProfileData(evt);
      closePopup();
  });
  formAddingNewPlace.addEventListener('submit', (evt)=>{
    createcardNewFromAddForm(evt);
    closePopup();
  });
}

export function initPopups(){
  initForms();
  buttonEditProfile.addEventListener('click', ()=>{
    openPopup(popupEditForm);
    fillEditForm()
  });
  buttonAddNewPlace.addEventListener('click', ()=>{
    openPopup(popupAddNewPlaceForm);
    fillNewPlaceForm();
  });
  document.addEventListener('keydown', documentKeyListenerHandler);
  document.addEventListener('mousedown', documentMouseDownListenerHandler);
}
