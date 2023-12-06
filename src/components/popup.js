const closePopup = {
  click: function (evt) {
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
      evt.currentTarget.classList.remove('popup_is-opened');
      // evt.currentTarget.removeEventListener('click', closePopup); // удаление слушателя
    }
  },

  escape: function (evt) {
    if (evt.key === 'Escape') {
      document.querySelector(".popup_is-opened").classList.remove('popup_is-opened'); // находим открытый попап и удаляем класс
      document.removeEventListener('keydown', closePopup.escape); // удаление слушателя
    }
  }
}

function addPopupListener(popup) {
  popup.classList.toggle('popup_is-opened');  
  popup.addEventListener('click', closePopup.click);
  document.addEventListener('keydown', closePopup.escape);
}

export {addPopupListener};

/*
editButton.addEventListener('click', function(evt){
  let closeButton = popupEdit.querySelector('.popup__close');
  popupEdit.setAttribute("open", "");  
  closeButton.addEventListener('click', () => popupEdit.removeAttribute("open", ""));
});
*/

/*
function closePopup(evt) {
  if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
    evt.currentTarget.classList.remove('popup_is-opened');
    // evt.currentTarget.removeEventListener('click', closePopup); // удаление слушателя
  }
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    document.querySelector(".popup_is-opened").classList.remove('popup_is-opened'); // находим открытый попап и удаляем класс
    document.removeEventListener('keydown', closePopupEsc); // удаление слушателя
  }
}
*/