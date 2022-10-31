import '../styles/index.css';

import { enableValidation, isValid, toggleButtonState } from './validate';
import  * as api from './api';
import  * as popup from './modal';
import { createCard } from './cards';

(()=>{
    let myId = '';
    const profileName = document.querySelector('.profile__title');
    const profileJob = document.querySelector('.profile__subtitle');
    const profileAvatar = document.querySelector('.profile__avatar');

    const buttonEditProfile = document.querySelector('.profile__edit-button');
    const popupEditForm = document.querySelector('.popup_type_edit-form');
    const formProfileEdit = document.querySelector('.form-profile-edit');
    const profileEditNameInput = document.querySelector('.form-profile-edit__name');
    const profileEditJobInput = document.querySelector('.form-profile-edit__job');
    const popupEditProfileSaveProfileBtn = formProfileEdit.querySelector('.form__button');

    const buttonEditAvatar = document.querySelector('.profile__avatar-edit-btn');
    const popupEditAvatarForm = document.querySelector('.popup_type_edit-avatar-form');
    const editAvatarForm = document.querySelector('.form-edit-avatar');
    const profileEditAvatarInput = document.querySelector('.form-edit-avatar__url');
    const popupSaveAvatarBtn = editAvatarForm.querySelector('.form__button');

    const buttonAddNewPlace = document.querySelector('.profile__add-button');
    const formAddingNewPlace = document.querySelector('.form-new-place');
    const popupNewPlaceSaveProfileBtn = formAddingNewPlace.querySelector('.form__button');
    const formDelCard = document.querySelector('.form-del-card');
    const popupAddNewPlaceForm = document.querySelector('.popup_type_add-form');
    const cardsContainer = document.querySelector('.cards');
    const previewDescription = document.querySelector('.popup__description');
    const previewImage = document.querySelector('.popup__picture');
    const previewPopup = document.querySelector('.popup_type_picture');

    const placeNewNameInput = document.querySelector('.form-new-place__name');
    const placeNewUrlInput = document.querySelector('.form-new-place__url');
    const popupDelCard = document.querySelector('.popup_type_del-card-form');
    const cardToDel = () => document.querySelector('.card_to-del');

    function startClosePopup() {
      clearCardDelMark();
      popup.closePopup(addDocumentKeyListenerHandler, addDocumentMouseDownListenerHandler);
    }

    function addDocumentKeyListenerHandler(evt){
      if(evt.key=='Escape'){
        startClosePopup();
      };
    }

    function addDocumentMouseDownListenerHandler(evt) {
      if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')){
        startClosePopup();
      };
    }

    function getInputListFromForm(form, selector){
      return form.querySelectorAll(selector);
    }

    function getSubmitFromForm(form, selector){
      return form.querySelector(selector);
    }

    function fillLike(like){
      like.classList.add('card__like_active');
    }

    function unfillLike(like){
      like.classList.remove('card__like_active');
    }

    function printLikeCount(card, likeCount) {
      const LikeEl = card.querySelector('.card__like-count');
      LikeEl.textContent = likeCount;
    }

    function toggleLike(target){
      const card = target.closest('.card');
      const cardId = card.dataset.cardId;
      if(target.classList.contains('card__like_active')){
        unfillLike(target);
        api.delLike(cardId)
          .then((data)=>{
            printLikeCount(card, data.likes.length);
          })
          .catch((err) => {
            fillLike(target);
            console.log(err);
          });
      }else{
        fillLike(target)
        api.setLike(cardId)
          .then((data)=>{
            printLikeCount(card, data.likes.length);
          })
          .catch((err) => {
            unfillLike(target);
            console.log(err);
          });
      }
    }

    function deleteCard(){
      const card = cardToDel();
      if(card!==null){
        api.delCard(card.dataset.cardId)
          .then(card.remove())
          .catch((err) => {
            console.log(err);
          });
      };
    }

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

  enableValidation({
    formSelector: '.form',
    inputSelector: '.form__text-input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'form__text-input_error',
    errorClass: 'form__span_active',
    listener: setEventListeners
  });

  const handler = (evt) => {
    const inputList = getInputListFromForm(evt.target, '.form__text-input');
    if(!inputList){
      this.submit();
    }
  }

  function fillEditForm(){
    profileEditNameInput.value = profileName.textContent;
    profileEditNameInput.dispatchEvent(new Event('input'));
    profileEditJobInput.value = profileJob.textContent;
    profileEditJobInput.dispatchEvent(new Event('input'));
  }

  function fillEditAvatarForm(){
    profileEditAvatarInput.value = profileAvatar.src;
    profileEditAvatarInput.dispatchEvent(new Event('input'));
  }

  function saveProfileData(){
    popupEditProfileSaveProfileBtn.value = 'Сохранение...';
    api.setUserInfo(profileEditNameInput.value, profileEditJobInput.value)
      .then((data)=>{
        profileName.textContent = data.name;
        profileJob.textContent = data.about;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(
        popupEditProfileSaveProfileBtn.value = 'Сохранить'
      );
    formProfileEdit.reset();
  }

  const clearCardDelMark = ()=>{
    const card = cardToDel();
    if(card!==null){
      card.classList.remove('card_to-del');
    }
  };

  function addNewCard(){
    popupNewPlaceSaveProfileBtn.value = 'Сохранение...'
    api.setNewCard(placeNewNameInput.value, placeNewUrlInput.value)
      .then((element)=>{
        cardsContainer.prepend(createCard(element, myId, listenerForPreview, fillLike, printLikeCount));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(
        popupNewPlaceSaveProfileBtn.value = 'Сохранить'
      );
  }

  function fillNewPlaceForm(){
    formAddingNewPlace.reset();
    placeNewNameInput.dispatchEvent(new Event('input'));
    placeNewUrlInput.dispatchEvent(new Event('input'));
  }

  function saveAvatar(){
    popupSaveAvatarBtn.value = 'Сохранение...';
    api.setNewAvatar(profileEditAvatarInput.value)
      .then((data)=>{
        profileAvatar.src = data.avatar;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(
        popupSaveAvatarBtn.value = 'Сохранить'
      );
  }

  function fillPreview(evt){
    const selectedCard = evt.target.closest('.card');
    const cardText = selectedCard.querySelector('.card__text').textContent;
    previewDescription.textContent = cardText;
    previewImage.src = selectedCard.querySelector('.card__image').src;
    previewImage.alt = cardText;
  }

  const listenerForPreview = (evt)=>{
    evt.stopPropagation();
    popup.openPopup(previewPopup, addDocumentKeyListenerHandler, addDocumentMouseDownListenerHandler);
    fillPreview(evt);
  };

  function fillCards() {
    api.getCards()
      .then((data)=>{
        data.forEach(element => {
          cardsContainer.prepend(createCard(element, myId, listenerForPreview, fillLike, printLikeCount));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function initCards(){
    fillCards();
    buttonAddNewPlace.addEventListener('click', ()=>{
      popup.openPopup(popupAddNewPlaceForm, addDocumentKeyListenerHandler, addDocumentMouseDownListenerHandler);
      fillNewPlaceForm();
      callToggleButton(popupAddNewPlaceForm);
    });
    formAddingNewPlace.addEventListener('submit', (evt)=>{
      evt.preventDefault();
      addNewCard();
      startClosePopup();
    });
    formAddingNewPlace.addEventListener('keydown', ()=>handler);
    formDelCard.addEventListener('submit', (evt)=>{
      evt.preventDefault();
      deleteCard();
      startClosePopup();
    });
    document.addEventListener('click', documentClickListenerHandler);
  }

  function fillProfileInfo(){
    api.getUserInfo()
      .then((data)=>{
        myId = data._id;
        initCards();
        profileName.textContent = data.name;
        profileJob.textContent = data.about;
        profileAvatar.src = data.avatar;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function initProfile(){
    fillProfileInfo();
    buttonEditProfile.addEventListener('click', ()=>{
      popup.openPopup(popupEditForm, addDocumentKeyListenerHandler, addDocumentMouseDownListenerHandler);
      fillEditForm();
      callToggleButton(popupEditForm);
    });
    buttonEditAvatar.addEventListener('click', ()=>{
      popup.openPopup(popupEditAvatarForm, addDocumentKeyListenerHandler, addDocumentMouseDownListenerHandler);
      fillEditAvatarForm();
      callToggleButton(popupEditAvatarForm);
    });
    formProfileEdit.addEventListener('submit', (evt)=>{
      evt.preventDefault();
      saveProfileData();
      startClosePopup();
    });
    formProfileEdit.addEventListener('keydown', handler);
    editAvatarForm.addEventListener('submit', (evt)=>{
      evt.preventDefault();
      saveAvatar();
      startClosePopup();
    });
    editAvatarForm.addEventListener('keydown', handler);
  }

  function callToggleButton(form){
    toggleButtonState(getInputListFromForm(form, '.form__text-input'), getSubmitFromForm(form, '.form__button'), 'popup__button_disabled');
  }

  function documentClickListenerHandler(evt) {
    if(evt.target.classList.contains('card__like')){
      toggleLike(evt.target);
    }else if(evt.target.classList.contains('card__delete')){
      evt.target.closest('.card').classList.add('card_to-del');
      popup.openPopup(popupDelCard, addDocumentKeyListenerHandler, addDocumentMouseDownListenerHandler);
    };
  }

  initProfile();

})();
