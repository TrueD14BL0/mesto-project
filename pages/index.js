const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];

function createCard(name, link){
  const cardTemplate = document.querySelector('#card-template').content;
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  newCard.querySelector('.card__image').src = link;
  newCard.querySelector('.card__text').textContent = name;
  return newCard;
}

function addCardToStart(card){
  const cards = document.querySelector('.cards');
  cards.prepend(card);
  card.querySelector('.card__like').addEventListener('click', (evt)=>evt.target.classList.toggle('card__like_active'));
}

function initCards(){
  initialCards.forEach(element => {
    addCardToStart(createCard(element.name, element.link));
  });
}

function closePopup(popup){
  popup.style.opacity = 0;
  setTimeout(function () {
    popup.classList.remove('popup_opened');
  },500);
}

function openPopupWithClass(popupType, fillFunc){
  const popup = document.querySelector(popupType);
  const closeBtn = popup.querySelector('.popup__close-button');
  popup.classList.add('popup_opened');
  closeBtn.addEventListener('click', () => {closePopup(popup)});
  setTimeout(function () {
    popup.style.opacity = 1;
    fillFunc();
  },1);
}

function getProfileTitleContent(){
  return document.querySelector('.profile__title').textContent;
}

function setProfileTitleContent(text=''){
  document.querySelector('.profile__title').textContent = text;
}

function getProfileSubtitleContent(){
  return document.querySelector('.profile__subtitle').textContent;
}

function setProfileSubtitleContent(text = ''){
  document.querySelector('.profile__subtitle').textContent = text;
}

function saveProfileData(evt){
  evt.preventDefault();
  const form = evt.target;
  setProfileTitleContent(form.querySelector('.form-profile-edit__name').value);
  setProfileSubtitleContent(form.querySelector('.form-profile-edit__job').value);
  closePopup(form.closest('.popup'));
}

function fillEditForm(){
  const editForm = document.querySelector('.form-profile-edit');
  editForm.querySelector('.form-profile-edit__name').value = getProfileTitleContent();
  editForm.querySelector('.form-profile-edit__job').value = getProfileSubtitleContent();
  editForm.addEventListener('submit', saveProfileData);
}

const editBtn = document.querySelector('.profile__edit-button');
editBtn.addEventListener('click', ()=>openPopupWithClass('.popup_type_edit-form', fillEditForm));

initCards();
