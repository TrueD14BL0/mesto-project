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

const cardTemplate = document.querySelector('#card-template').content;
const cards = document.querySelector('.cards');
const popupEditForm = document.querySelector('.popup_type_edit-form');
const popupAddNewPlaceForm = document.querySelector('.popup_type_add-form');
const previewPopup = document.querySelector('.popup_type_picture');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const editProfileForm = document.querySelector('.form-profile-edit');
const newPlaceForm = document.querySelector('.form-new-place');
const editProfileNameInput = document.querySelector('.form-profile-edit__name');
const editProfileJobInput = document.querySelector('.form-profile-edit__job');
const newPlaceNameInput = document.querySelector('.form-new-place__name');
const newPlaceUrlInput = document.querySelector('.form-new-place__url');
const previewDescription = document.querySelector('.popup__description');
const previewImage = document.querySelector('.popup__picture');
const opacityFull = 1;
const opacityZero = 0;

function fillPreview(evt){
  evt.stopPropagation();
  const selectedCard = evt.target.closest('.card');
  previewDescription.textContent = selectedCard.querySelector('.card__text').textContent;
  previewImage.src = selectedCard.querySelector('.card__image').src;
}

function createCard(name, link){
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  newCard.querySelector('.card__image').src = link;
  newCard.querySelector('.card__text').textContent = name;
  newCard.querySelector('.card__image').addEventListener('click', (evt)=>preparePopup(previewPopup, fillPreview(evt)));
  newCard.querySelector('.card__like').addEventListener('click', (evt)=>setLikeActive(evt));
  newCard.querySelector('.card__delete').addEventListener('click', (evt)=>pushDeleteCardBtn(evt));
  return newCard;
}

function setLikeActive(evt){
  evt.target.classList.toggle('card__like_active')
}

function deleteCard(card){
  card.remove();
}

function pushDeleteCardBtn(evt){
  evt.stopPropagation();
  deleteCard(evt.target.closest('.card'));
}

function addCardToCards(card){
  cards.prepend(card);
}

function initCards(){
  initialCards.forEach(element => {
    addCardToCards(createCard(element.name, element.link));
  });
}

function setOpacity(elem, factor){
  elem.style.opacity = factor;
}

function closePopup(popup){
  setOpacity(popup, opacityZero);
  setTimeout(function () {
    popup.classList.remove('popup_opened');
  },500);
}

function findCloseBtn(parent){
  return parent.querySelector('.popup__close-button');
}

function openPopup(popup){
  popup.classList.add('popup_opened');
}

function preparePopup(popup, fillFunc){
  const closeBtn = findCloseBtn(popup);
  closeBtn.addEventListener('click', () => {closePopup(popup)});
  openPopup(popup);
  setTimeout(function () {
    setOpacity(popup, opacityFull);
    fillFunc();
  },1);
}

function saveProfileData(evt){
  evt.preventDefault();
  profileName.textContent = editProfileNameInput.value;
  profileJob.textContent = editProfileJobInput.value;
}

function createNewCardFromAddForm(evt){
  evt.preventDefault();
  addCardToCards(createCard(newPlaceNameInput.value, newPlaceUrlInput.value));
}

function fillEditForm(){
  editProfileNameInput.value = profileName.textContent;
  editProfileJobInput.value = profileJob.textContent;
  editProfileForm.addEventListener('submit', ()=>{
    saveProfileData(evt);
    closePopup(popupEditForm);
  });
}

function fillNewPlaceForm(){
  newPlaceNameInput.value = '';
  newPlaceUrlInput.value = '';
  newPlaceForm.addEventListener('submit', ()=>{
    createNewCardFromAddForm();
    closePopup(popupAddNewPlaceForm);
  });
}

const editBtn = document.querySelector('.profile__edit-button');
editBtn.addEventListener('click', ()=>preparePopup(popupEditForm, fillEditForm));
const addBtn = document.querySelector('.profile__add-button');
addBtn.addEventListener('click', ()=>preparePopup(popupAddNewPlaceForm, fillNewPlaceForm));

initCards();
