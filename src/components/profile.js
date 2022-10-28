import { getUserInfo, setUserInfo } from './api'
import { openPopup, callToggleButton, addFormKeyDownListenerHandler as handler, closePopup  } from './modal'
import { initCards } from './cards';

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const profileAvatar = document.querySelector('.profile__avatar');
const formProfileEdit = document.querySelector('.form-profile-edit');
const profileEditNameInput = document.querySelector('.form-profile-edit__name');
const profileEditJobInput = document.querySelector('.form-profile-edit__job');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditForm = document.querySelector('.popup_type_edit-form');
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
  profileEditJobInput.value = profileJob.textContent;
}

function saveProfileData(evt){
  evt.preventDefault();
  setUserInfo(profileEditNameInput.value, profileEditJobInput.value)
    .then((data)=>{
      profileName.textContent = data.name;
      profileJob.textContent = data.about;
    })
    .catch((err) => {
      console.log(err);
    });
  formProfileEdit.reset();
}

export function initProfile(){
  fillProfileInfo();
  buttonEditProfile.addEventListener('click', ()=>{
    openPopup(popupEditForm);
    fillEditForm();
    callToggleButton(popupEditForm);
  });
  formProfileEdit.addEventListener('submit', (evt)=>{
    saveProfileData(evt);
    closePopup();
  });
  formProfileEdit.addEventListener('keydown', handler);
}
