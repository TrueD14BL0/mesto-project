function openPopup(){
  const $popup = document.querySelector('.popup');
  const $closeBtn = $popup.querySelector('.popup__close-button');
  $popup.classList.add('popup_opened');
  $closeBtn.addEventListener('click', () => {closePopup($popup)});
}

function closePopup($popupToClose){
  $popupToClose.classList.remove('popup_opened');
}



const $editBtn = document.querySelector('.profile__edit-button');
$editBtn.addEventListener('click', openPopup);

const likeBtns = document.querySelectorAll('.card__like');
likeBtns.forEach(element => {
  element.addEventListener('click', ()=>{
    element.classList.toggle('card__like_active');
  });
});
