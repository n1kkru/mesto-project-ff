import {openModal} from './modal.js';

// Попап изображения
const popupImage = document.querySelector('.popup_type_image');

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
function createCard(title, img, handlerDelete, handlerLike, handleOpenImage) {
  const cardElem = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElem.querySelector('.card__image');
  const cardDeleteButton = cardElem.querySelector('.card__delete-button');
  const cardLikeButton = cardElem.querySelector('.card__like-button');

  cardImage.src = img;
  cardImage.alt = title;
  cardElem.querySelector('.card__title').textContent = title;

  cardDeleteButton.addEventListener('click', () => {
    handlerDelete(cardElem);
  }); 
  cardImage.addEventListener('click', (evt) => {
    handleOpenImage(evt, popupImage);
  });
  cardLikeButton.addEventListener('click', handlerLike);

  return cardElem;
}

// Функция удаления карточки
function deleteCard(cardElement) {  
  cardElement.remove();
}; 

// Функция лайка
const likeCard = (evt) => { if (evt.target.classList.contains('card__like-button')) {
  evt.target.classList.toggle('card__like-button_is-active');
}}

// Функция открытия изображения
function handleImage(evt, popup) {
  const popupContentImage = popup.querySelector('.popup__image');
  const popupCaption = popup.querySelector('.popup__caption');
  popupContentImage.src = evt.target.src;
  popupContentImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;    
  openModal(popup);
}

export {createCard, deleteCard, likeCard, handleImage};