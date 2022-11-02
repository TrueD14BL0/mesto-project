const cardTemplate = document.querySelector('#card-template').content;

export function fillLike(like){
  like.classList.add('card__like_active');
}

export function unfillLike(like){
  like.classList.remove('card__like_active');
}

export function printLikeCount(card, likeCount) {
  const LikeEl = card.querySelector('.card__like-count');
  LikeEl.textContent = likeCount;
}

function toggleLike(card, cardId, likePic, listenersForLikebtn){
  if(likePic.classList.contains('card__like_active')){
    listenersForLikebtn.delLike(card, cardId, likePic);
  }else{
    listenersForLikebtn.setLike(card, cardId, likePic);
  }
}

export function createCard(elementData, myId, listenerForPreview, listenerForDelbtn, listenersForLikebtn){
  const cardNew = cardTemplate.querySelector('.card').cloneNode(true);
  const imageNewCard = cardNew.querySelector('.card__image');
  const likePic = cardNew.querySelector('.card__like');
  cardNew.dataset.cardId = elementData._id;
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
  delBtn.addEventListener('click', ()=>{cardNew.classList.add('card_to-del'); listenerForDelbtn();});
  likePic.addEventListener('click', (evt)=>toggleLike(cardNew, elementData._id, evt.target, listenersForLikebtn));
  imageNewCard.src = elementData.link;
  imageNewCard.alt = elementData.name;
  cardNew.querySelector('.card__text').textContent = elementData.name;
  imageNewCard.addEventListener('click', listenerForPreview);
  return cardNew;
}
