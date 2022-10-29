import { getUserInfo, setUserInfo, setNewAvatar } from './api'
import { openPopup, closePopup  } from './modal'
import { callToggleButton, addFormKeyDownListenerHandler as handler  } from './utils'
import { initCards } from './cards';

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


let myId = '';

export function getMyId(){
  return myId;
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

export function initProfile(){
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
