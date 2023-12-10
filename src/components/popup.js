import {likeCard} from './cards.js';
import {editForm, popupImage, profileDescription, profileTitle} from '../index.js';

const closePopup = {
  click: function (evt) {
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
      evt.currentTarget.classList.remove('popup_is-opened');
    }
  },

  escape: function (evt) {
    if (evt.key === 'Escape') {
      document.querySelector(".popup_is-opened").classList.remove('popup_is-opened'); // находим открытый попап и удаляем класс
      document.removeEventListener('keydown', closePopup.escape); // удаление слушателя
    }
  }
}

// обработчик кнопки в редакторе профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = editForm.elements.name.value;
  profileDescription.textContent = editForm.elements.description.value;
  document.querySelector(".popup_is-opened").classList.remove('popup_is-opened');
}

// добавление слушателей
function addPopupListener(evt, popup) {
  // попап изображения
  if (popup.classList.contains('popup_type_image')) {
    const popupImage = popup.querySelector('.popup__image');
    const popupCaption = popup.querySelector('.popup__caption');
    popupImage.src = evt.target.src;
    popupCaption.textContent = evt.target.alt;    
  }
  // открыть и добавить слушатели на закрытие
  popup.classList.add('popup_is-opened');  
  popup.addEventListener('click', closePopup.click);
  document.addEventListener('keydown', closePopup.escape);
}

// обработчик слушателя лайка и открытия карточки
function handleImage(evt) {
  likeCard(evt);
  if (evt.target.classList.contains('card__image')) {
    addPopupListener(evt, popupImage);
  }
}

export {addPopupListener, handleFormSubmit, handleImage};