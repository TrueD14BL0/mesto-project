export function openPopup(popup, keyHandler, mouseHandler){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);
  document.addEventListener('mousedown', mouseHandler);
}

export function closePopup(keyHandler, mouseHandler){
  const popup = document.querySelector('.popup_opened');
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
  document.removeEventListener('mousedown', mouseHandler);
}
