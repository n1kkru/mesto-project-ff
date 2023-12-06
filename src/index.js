// Импорты
import './index.css';
import {initialCards} from './components/cards.js';
import {addPopupListener} from './components/popup.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');


// @todo: Функция создания карточки
function createCard(title, img, handler) {
  const cardElem = cardTemplate.querySelector('.card').cloneNode(true);
  let cardImage = cardElem.querySelector('.card__image')
  cardImage.src = img;
  cardImage.alt = title;
  cardElem.querySelector('.card__title').textContent = title;

  cardElem.querySelector('.card__delete-button').addEventListener('click', handler); 

  return cardElem;
}

// @todo: Функция удаления карточки
const deleteCard = (evt) =>  evt.target.parentElement.remove();

// @todo: Вывести карточки на страницу
initialCards.forEach(function (elem) {
  cardList.append(createCard(elem.name, elem.link, deleteCard));
})

// Модальные окна
editButton.addEventListener('click', () => {
  addPopupListener(popupEdit);  
});

addButton.addEventListener('click', () => {
  addPopupListener(popupNewCard);
});
