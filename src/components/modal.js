function addDocumentKeyListenerHandler(evt){
  if(evt.key=='Escape'){
    closePopup();
  };
}

function addDocumentMouseDownListenerHandler(evt) {
  if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')){
    closePopup();
  };
}

export function openPopup(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', addDocumentKeyListenerHandler);
  document.addEventListener('mousedown', addDocumentMouseDownListenerHandler);
}

export function closePopup(){
  const popup = document.querySelector('.popup_opened');
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', addDocumentKeyListenerHandler);
  document.removeEventListener('mousedown', addDocumentMouseDownListenerHandler);
}
