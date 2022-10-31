const cardTemplate = document.querySelector('#card-template').content;

export function createCard(elementData, myId, listenerForPreview, fillLike, printLikeCount){
  const cardNew = cardTemplate.querySelector('.card').cloneNode(true);
  cardNew.dataset.cardId = elementData._id;
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
  imageNewCard.src = elementData.link;
  imageNewCard.alt = elementData.name;
  cardNew.querySelector('.card__text').textContent = elementData.name;
  imageNewCard.addEventListener('click', listenerForPreview);
  return cardNew;
}
