// открытие модального окна
function openModal(popup) {
  popup.classList.add('popup_is-opened');
  // popup.addEventListener('click', closeByClick);
  document.addEventListener('keydown', closeByEsc);
} 

// закрытие модального окна
function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  // popup.removeEventListener('click', closeByClick);
  document.removeEventListener('keydown', closeByEsc);
}

// закртыие по escape
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup  = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

// закртыие по нажатию
function closeByClick(evt) {
  if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
    const openedPopup  = evt.currentTarget;
    closeModal(openedPopup);
  } 
}

export {openModal, closeModal, closeByClick};