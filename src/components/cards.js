import { openPopup, closePopup  } from './modal'
import { getCards, setNewCard, delCard, setLike, delLike } from './api';
import { getMyId } from './profile';

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.cards');
const popupAddNewPlaceForm = document.querySelector('.popup_type_add-form');
const formAddingNewPlace = document.querySelector('.form-new-place');
const popupSaveProfileBtn = formAddingNewPlace.querySelector('.form__button');
const buttonAddNewPlace = document.querySelector('.profile__add-button');
const placeNewNameInput = document.querySelector('.form-new-place__name');
const placeNewUrlInput = document.querySelector('.form-new-place__url');
const previewDescription = document.querySelector('.popup__description');
const previewImage = document.querySelector('.popup__picture');
const previewPopup = document.querySelector('.popup_type_picture');

const popupDelCard = document.querySelector('.popup_type_del-card-form');
const formDelCard = document.querySelector('.form-del-card');

const cardToDel = () => document.querySelector('.card_to-del');

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

export function createCard(elementData){
  const cardNew = cardTemplate.querySelector('.card').cloneNode(true);
  cardNew.dataset.cardId = elementData._id;
  const imageNewCard = cardNew.querySelector('.card__image');
  const likePic = cardNew.querySelector('.card__like');
  printLikeCount(cardNew, elementData.likes.length);
  const iLiked = elementData.likes.some((liker)=>{
    return liker._id === getMyId();
  });
  if(iLiked){
    fillLike(likePic);
  }
  const delBtn = cardNew.querySelector('.card__delete');
  if(elementData.owner._id !== getMyId()){
    delBtn.remove();
  }
  imageNewCard.src = elementData.link;
  imageNewCard.alt = elementData.name;
  cardNew.querySelector('.card__text').textContent = elementData.name;
  imageNewCard.addEventListener('click', (evt)=>{
    openPopup(previewPopup);
    fillPreview(evt)
  });
  return cardNew;
}

export function fillPreview(evt){
  evt.stopPropagation();
  const selectedCard = evt.target.closest('.card');
  const cardText = selectedCard.querySelector('.card__text').textContent;
  previewDescription.textContent = cardText;
  previewImage.src = selectedCard.querySelector('.card__image').src;
  previewImage.alt = cardText;
}

export function addCardToCards(card){
  cardsContainer.prepend(card);
}

function addNewCard(evt){
  evt.preventDefault();
  popupSaveProfileBtn.value = 'Сохранение...'
  setNewCard(placeNewNameInput.value, placeNewUrlInput.value)
    .then((data)=>{
      addCardToCards(createCard(data));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(
      popupSaveProfileBtn.value = 'Сохранить'
    );
}

function fillNewPlaceForm(){
  formAddingNewPlace.reset();
  placeNewNameInput.dispatchEvent(new Event('input'));
  placeNewUrlInput.dispatchEvent(new Event('input'));
}

function deleteCard(){
  const card = cardToDel();
  if(card!==null){
    delCard(card.dataset.cardId)
      .then(card.remove())
      .catch((err) => {
        console.log(err);
      });
  }
}

export const clearCardDelMark = ()=>{
  const card = cardToDel();
  if(card!==null){
    card.classList.remove('card_to-del');
  }
};

function toggleLike(target){
  const card = target.closest('.card');
  const cardId = card.dataset.cardId;
  if(target.classList.contains('card__like_active')){
    unfillLike(target);
    delLike(cardId)
      .then((data)=>{
        printLikeCount(card, data.likes.length);
      })
      .catch((err) => {
        fillLike(target);
        console.log(err);
      });
  }else{
    fillLike(target)
    setLike(cardId)
      .then((data)=>{
        printLikeCount(card, data.likes.length);
      })
      .catch((err) => {
        unfillLike(target);
        console.log(err);
      });
  }
}

function documentClickListenerHandler(evt) {
  if(evt.target.classList.contains('card__like')){
    toggleLike(evt.target);
  }else if(evt.target.classList.contains('card__delete')){
    evt.target.closest('.card').classList.add('card_to-del');
    openPopup(popupDelCard);
  };
}

function fillCards() {
  getCards()
    .then((data)=>{
      data.forEach(element => {
        addCardToCards(createCard(element));
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

export function initCards(){
  fillCards();
  buttonAddNewPlace.addEventListener('click', ()=>{
    openPopup(popupAddNewPlaceForm);
    fillNewPlaceForm();
    callToggleButton(popupAddNewPlaceForm);
  });
  formAddingNewPlace.addEventListener('submit', (evt)=>{
    addNewCard(evt);
    closePopup();
  });
  formAddingNewPlace.addEventListener('keydown', ()=>handler);
  formDelCard.addEventListener('submit', ()=>{
    deleteCard();
    closePopup();
  });
  document.addEventListener('click', documentClickListenerHandler);
}
