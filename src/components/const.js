export let myId = '';
export const setMyId = (id)=>{myId=id;};
export const getMyId = ()=>{return myId;};

export const profileName = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__subtitle');
export const profileAvatar = document.querySelector('.profile__avatar');

export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const popupEditForm = document.querySelector('.popup_type_edit-form');
export const formProfileEdit = document.querySelector('.form-profile-edit');
export const profileEditNameInput = document.querySelector('.form-profile-edit__name');
export const profileEditJobInput = document.querySelector('.form-profile-edit__job');
export const popupEditProfileSaveProfileBtn = formProfileEdit.querySelector('.form__button');

export const buttonEditAvatar = document.querySelector('.profile__avatar-edit-btn');
export const popupEditAvatarForm = document.querySelector('.popup_type_edit-avatar-form');
export const editAvatarForm = document.querySelector('.form-edit-avatar');
export const profileEditAvatarInput = document.querySelector('.form-edit-avatar__url');
export const popupSaveAvatarBtn = editAvatarForm.querySelector('.form__button');

export const buttonAddNewPlace = document.querySelector('.profile__add-button');
export const formAddingNewPlace = document.querySelector('.form-new-place');
export const popupNewPlaceSaveProfileBtn = formAddingNewPlace.querySelector('.form__button');
export const formDelCard = document.querySelector('.form-del-card');
export const popupAddNewPlaceForm = document.querySelector('.popup_type_add-form');
export const cardsContainer = document.querySelector('.cards');
export const previewDescription = document.querySelector('.popup__description');
export const previewImage = document.querySelector('.popup__picture');
export const previewPopup = document.querySelector('.popup_type_picture');

export const placeNewNameInput = document.querySelector('.form-new-place__name');
export const placeNewUrlInput = document.querySelector('.form-new-place__url');
export const popupDelCard = document.querySelector('.popup_type_del-card-form');
export const cardToDel = () => document.querySelector('.card_to-del');
export const clearCardDelMark = ()=>{
  const card = cardToDel();
  if(card!==null){
    card.classList.remove('card_to-del');
  }
};
