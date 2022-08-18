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
const cardsContainer = document.querySelector('.cards');
const popupEditForm = document.querySelector('.popup_type_edit-form');
const popupAddNewPlaceForm = document.querySelector('.popup_type_add-form');
const previewPopup = document.querySelector('.popup_type_picture');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const formProfileEdit = document.querySelector('.form-profile-edit');
const formAddingNewPlace = document.querySelector('.form-new-place');
const profileEditNameInput = document.querySelector('.form-profile-edit__name');
const profileEditJobInput = document.querySelector('.form-profile-edit__job');
const placeNewNameInput = document.querySelector('.form-new-place__name');
const placeNewUrlInput = document.querySelector('.form-new-place__url');
const previewDescription = document.querySelector('.popup__description');
const previewImage = document.querySelector('.popup__picture');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddNewPlace = document.querySelector('.profile__add-button');
const buttonsCloseList = document.querySelectorAll('.popup__close-button');

function fillPreview(evt){
  evt.stopPropagation();
  const selectedCard = evt.target.closest('.card');
  const cardText = selectedCard.querySelector('.card__text').textContent;
  previewDescription.textContent = cardText;
  previewImage.src = selectedCard.querySelector('.card__image').src;
  previewImage.alt = cardText;
}

function createCard(name, link){
  const cardNew = cardTemplate.querySelector('.card').cloneNode(true);
  const imageNewCard = cardNew.querySelector('.card__image');
  imageNewCard.src = link;
  imageNewCard.alt = name;
  cardNew.querySelector('.card__text').textContent = name;
  cardNew.querySelector('.card__image').addEventListener('click', (evt)=>preparePopup(previewPopup, fillPreview(evt)));
  cardNew.querySelector('.card__like').addEventListener('click', (evt)=>setLikeActive(evt));
  cardNew.querySelector('.card__delete').addEventListener('click', (evt)=>pushDeleteCardBtn(evt));
  return cardNew;
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
  cardsContainer.prepend(card);
}

function initCards(){
  initialCards.forEach(element => {
    addCardToCards(createCard(element.name, element.link));
  });
}

function closePopup(popup){
  popup.classList.remove('popup_opened');
}

function findCloseBtn(parent){
  return parent.querySelector('.popup__close-button');
}

function openPopup(popup){
  popup.classList.add('popup_opened');
}

function preparePopup(popup, fillFunc){
  const closeBtn = findCloseBtn(popup);
  openPopup(popup);
  fillFunc();
}

function saveProfileData(evt){
  evt.preventDefault();
  profileName.textContent = profileEditNameInput.value;
  profileJob.textContent = profileEditJobInput.value;
}

function createcardNewFromAddForm(evt){
  evt.preventDefault();
  addCardToCards(createCard(placeNewNameInput.value, placeNewUrlInput.value));
}

function fillEditForm(){
  profileEditNameInput.value = profileName.textContent;
  profileEditJobInput.value = profileJob.textContent;
}

function initForms(){
  formProfileEdit.addEventListener('submit', (evt)=>{
      saveProfileData(evt);
      closePopup(popupEditForm);
  });
  formAddingNewPlace.addEventListener('submit', (evt)=>{
    createcardNewFromAddForm(evt);
    closePopup(popupAddNewPlaceForm);
  });
}

function fillNewPlaceForm(){
  placeNewNameInput.value = '';
  placeNewUrlInput.value = '';
}

function initCloseButtons(){
  buttonsCloseList.forEach(element => element.addEventListener('click', (evt) => closePopup(evt.target.closest('.popup'))));
}

function initSiteElements(){
  buttonEditProfile.addEventListener('click', ()=>preparePopup(popupEditForm, fillEditForm));
  buttonAddNewPlace.addEventListener('click', ()=>preparePopup(popupAddNewPlaceForm, fillNewPlaceForm));
  initCloseButtons();
  initCards();
  initForms();
}

initSiteElements();

