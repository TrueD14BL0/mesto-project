import { initialCards } from './const';
import { previewPopup, fillPreview, openPopup } from './modal.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.cards');

export function createCard(name, link){
  const cardNew = cardTemplate.querySelector('.card').cloneNode(true);
  const imageNewCard = cardNew.querySelector('.card__image');
  imageNewCard.src = link;
  imageNewCard.alt = name;
  cardNew.querySelector('.card__text').textContent = name;
  imageNewCard.addEventListener('click', (evt)=>{
    openPopup(previewPopup);
    fillPreview(evt)
  });
  return cardNew;
}

function deleteCard(card){
  card.remove();
}

export function addCardToCards(card){
  cardsContainer.prepend(card);
}

function documentClickListenerHandler(evt) {
  if(evt.target.classList.contains('card__like')){
    evt.target.classList.toggle('card__like_active');
  }else if(evt.target.classList.contains('card__delete')){
    deleteCard(evt.target.closest('.card'));;
  };
}

export function initCards(){
  initialCards.forEach(element => {
    addCardToCards(createCard(element.name, element.link));
  });
  document.addEventListener('click', documentClickListenerHandler);
}
