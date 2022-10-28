import { previewPopup, fillPreview, openPopup } from './modal.js';
import { getCards } from './api';
import { getMyId } from './profile';

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.cards');

export function createCard(name, link, cardId, ownerId){
  const cardNew = cardTemplate.querySelector('.card').cloneNode(true);
  cardNew.dataset.cardId = cardId;
  const imageNewCard = cardNew.querySelector('.card__image');
  const delBtn = cardNew.querySelector('.card__delete');
  if(ownerId !== getMyId){
    delBtn.remove();
  }
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

function fillCards() {
  getCards()
    .then((data)=>{
      data.forEach(element => {
        addCardToCards(createCard(element.name, element.link, element._id, element.owner._id));
      });
    });
}

export function initCards(){
  fillCards();
  document.addEventListener('click', documentClickListenerHandler);
}
