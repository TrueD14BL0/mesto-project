import '../styles/index.css';

import { enableValidation } from './validate';

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
    const popupSaveProfileBtn = formProfileEdit.querySelector('.form__button');

    const buttonEditAvatar = document.querySelector('.profile__avatar-edit-btn');
    const popupEditAvatarForm = document.querySelector('.popup_type_edit-avatar-form');
    const editAvatarForm = document.querySelector('.form-edit-avatar');
    const profileEditAvatarInput = document.querySelector('.form-edit-avatar__url');
    const popupSaveAvatarBtn = editAvatarForm.querySelector('.form__button');

  enableValidation({
    formSelector: '.form',
    inputSelector: '.form__text-input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'form__text-input_error',
    errorClass: 'form__span_active'
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

  function saveProfileData(evt){
    evt.preventDefault();
    popupSaveProfileBtn.value = 'Сохранение...';
    setUserInfo(profileEditNameInput.value, profileEditJobInput.value)
      .then((data)=>{
        profileName.textContent = data.name;
        profileJob.textContent = data.about;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(
        popupSaveProfileBtn.value = 'Сохранить'
      );
    formProfileEdit.reset();
  }

  function saveAvatar(evt){
    evt.preventDefault();
    popupSaveAvatarBtn.value = 'Сохранение...';
    setNewAvatar(profileEditAvatarInput.value)
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

  function fillProfileInfo(){
    getUserInfo()
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
      openPopup(popupEditForm);
      fillEditForm();
      callToggleButton(popupEditForm);
    });
    buttonEditAvatar.addEventListener('click', ()=>{
      openPopup(popupEditAvatarForm);
      fillEditAvatarForm();
      callToggleButton(popupEditAvatarForm);
    });
    formProfileEdit.addEventListener('submit', (evt)=>{
      saveProfileData(evt);
      closePopup();
    });
    formProfileEdit.addEventListener('keydown', handler);
    editAvatarForm.addEventListener('submit', (evt)=>{
      saveAvatar(evt);
      closePopup();
    });
    editAvatarForm.addEventListener('keydown', handler);
  }

  initProfile();

  function getInputListFromForm(form, selector){
    return form.querySelectorAll(selector);
  }

  function getSubmitFromForm(form, selector){
    return form.querySelector(selector);
  }



  function callToggleButton(form){
    toggleButtonState(getInputListFromForm(form, '.form__text-input'), getSubmitFromForm(form, '.form__button'), 'popup__button_disabled');
  }








})();
