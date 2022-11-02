import '../styles/index.css';

import { enableValidation, callToggleButton } from './validate';
import  * as api from './api';
import  * as popup from './modal';
import  * as c from './const';
import { createCard, fillLike, unfillLike, printLikeCount } from './cards';
import { getInputListFromForm } from './utils';

function startPage(){

    function deleteCard(){
      const card = c.cardToDel();
      if(card!==null){
        api.delCard(card.dataset.cardId)
          .then(()=>{
            card.remove();
            popup.closePopup();
          })
          .catch((err) => {
            console.log(err);
          });
      };
    }

  enableValidation({
    formSelector: '.form',
    inputSelector: '.form__text-input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'form__text-input_error',
    errorClass: 'form__span_active'
  });

  const formKeyListenerHandler = (evt) => {
    const inputList = getInputListFromForm(evt.target, '.form__text-input');
    if(!inputList){
      this.submit();
    }
  }

  function fillEditForm(){
    c.profileEditNameInput.value = c.profileName.textContent;
    c.profileEditNameInput.dispatchEvent(new Event('input'));
    c.profileEditJobInput.value = c.profileJob.textContent;
    c.profileEditJobInput.dispatchEvent(new Event('input'));
  }

  function fillEditAvatarForm(){
    c.profileEditAvatarInput.value = c.profileAvatar.src;
    c.profileEditAvatarInput.dispatchEvent(new Event('input'));
  }

  function saveProfileData(){
    c.popupEditProfileSaveProfileBtn.value = 'Сохранение...';
    api.setUserInfo(c.profileEditNameInput.value, c.profileEditJobInput.value)
      .then((data)=>{
        c.profileName.textContent = data.name;
        c.profileJob.textContent = data.about;
        popup.closePopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(
        c.popupEditProfileSaveProfileBtn.value = 'Сохранить'
      );
    c.formProfileEdit.reset();
  }

  function openDelCardPopup() {
    popup.openPopup(c.popupDelCard);
  }

  function delLike(card, cardId, likePic) {
    api.delLike(cardId)
        .then((data)=>{
          printLikeCount(card, data.likes.length);
          unfillLike(likePic);
        })
        .catch((err) => {
          console.log(err);
        });
  }

  function setLike(card, cardId, likePic) {
    api.setLike(cardId)
    .then((data)=>{
      fillLike(likePic)
      printLikeCount(card, data.likes.length);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function addNewCard(){
    c.popupNewPlaceSaveProfileBtn.value = 'Сохранение...'
    api.setNewCard(c.placeNewNameInput.value, c.placeNewUrlInput.value)
      .then((element)=>{
        c.cardsContainer.append(createCard(element, c.getMyId(), listenerForPreview, openDelCardPopup, {setLike:setLike, delLike: delLike}));
        popup.closePopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(
        c.popupNewPlaceSaveProfileBtn.value = 'Сохранить'
      );
  }

  function fillNewPlaceForm(){
    c.formAddingNewPlace.reset();
    c.placeNewNameInput.dispatchEvent(new Event('input'));
    c.placeNewUrlInput.dispatchEvent(new Event('input'));
  }

  function saveAvatar(){
    c.popupSaveAvatarBtn.value = 'Сохранение...';
    api.setNewAvatar(c.profileEditAvatarInput.value)
      .then((data)=>{
        c.profileAvatar.src = data.avatar;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(
        c.popupSaveAvatarBtn.value = 'Сохранить'
      );
  }

  function fillPreview(evt){
    const selectedCard = evt.target.closest('.card');
    const cardText = selectedCard.querySelector('.card__text').textContent;
    c.previewDescription.textContent = cardText;
    c.previewImage.src = selectedCard.querySelector('.card__image').src;
    c.previewImage.alt = cardText;
  }

  const listenerForPreview = (evt)=>{
    evt.stopPropagation();
    popup.openPopup(c.previewPopup);
    fillPreview(evt);
  };

  function initCards() {
    api.getCards()
      .then((data)=>{
        data.forEach(element => {
          c.cardsContainer.append(createCard(element, c.getMyId(), listenerForPreview,  openDelCardPopup, {setLike:setLike, delLike: delLike}));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  c.buttonAddNewPlace.addEventListener('click', ()=>{
    popup.openPopup(c.popupAddNewPlaceForm);
    fillNewPlaceForm();
    callToggleButton(c.popupAddNewPlaceForm);
  });
  c.formAddingNewPlace.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    addNewCard();
  });
  c.formAddingNewPlace.addEventListener('keydown', ()=>formKeyListenerHandler);
  c.formDelCard.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    deleteCard();
  });

  function initProfile(){
    api.getUserInfo()
      .then((data)=>{
        c.setMyId(data._id);
        initCards();
        c.profileName.textContent = data.name;
        c.profileJob.textContent = data.about;
        c.profileAvatar.src = data.avatar;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  c.buttonEditProfile.addEventListener('click', ()=>{
    popup.openPopup(c.popupEditForm);
    fillEditForm();
    callToggleButton(c.popupEditForm);
  });
  c.buttonEditAvatar.addEventListener('click', ()=>{
    popup.openPopup(c.popupEditAvatarForm);
    fillEditAvatarForm();
    callToggleButton(c.popupEditAvatarForm);
  });
  c.formProfileEdit.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    saveProfileData();
  });
  c.formProfileEdit.addEventListener('keydown', formKeyListenerHandler);
  c.editAvatarForm.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    saveAvatar();
    popup.closePopup();
  });
  c.editAvatarForm.addEventListener('keydown', formKeyListenerHandler);

  initProfile();

};

startPage();
