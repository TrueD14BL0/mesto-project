const cardTemplate = document.querySelector('#card-template').content;

export function fillLike(like){
  like.classList.add('card__like_active');
}

export function unfillLike(like){
  like.classList.remove('card__like_active');
}

function printLikeCount(card, likeCount) {
  const LikeEl = card.querySelector('.card__like-count');
  LikeEl.textContent = likeCount;
}

function toggleLike(target, delLike, setLike){
  const card = target.closest('.card');
  const cardId = card.dataset.cardId;
  if(target.classList.contains('card__like_active')){
    delLike(cardId);
  }else{
    setLike(cardId);
  }
}

export function documentCardClickListenerHandler(evt, delLike, setLike) {
  if(evt.target.classList.contains('card__like')){
    toggleLike(evt.target, delLike, setLike);
  }else if(evt.target.classList.contains('card__delete')){
    evt.target.closest('.card').classList.add('card_to-del');
    popup.openPopup(c.popupDelCard);
  };
}

export function createCard(elementData, myId, listenerForPreview, listenerForDelbtn){
  const cardNew = cardTemplate.querySelector('.card').cloneNode(true);
  const imageNewCard = cardNew.querySelector('.card__image');
  const likePic = cardNew.querySelector('.card__like');
  printLikeCount(cardNew, elementData.likes.length);
  const iLiked = elementData.likes.some((liker)=>{
    return liker._id === myId;
  });
  if(iLiked){
    fillLike(likePic);
  }
  const delBtn = cardNew.querySelector('.card__delete');
  if(elementData.owner._id !== myId){
    delBtn.remove();
  }
  delBtn.addEventListener('click', ()=>(listenerForDelbtn(cardNew, elementData._id)))
  imageNewCard.src = elementData.link;
  imageNewCard.alt = elementData.name;
  cardNew.querySelector('.card__text').textContent = elementData.name;
  imageNewCard.addEventListener('click', listenerForPreview);
  return cardNew;
}
