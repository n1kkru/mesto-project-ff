// Импорты
import './index.css';
import {initialCards, createCard, deleteCard, likeCard} from './components/cards.js';
import {addPopupListener, handleFormSubmit, handleImage} from './components/popup.js';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const cardList = document.querySelector('.places__list');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editForm = document.forms['edit-profile'];
const addForm = document.forms['new-place'];

export {editForm, addForm, popupImage, profileDescription, profileTitle};

// Вывести карточки на страницу
initialCards.forEach((elem) => {
  cardList.append(createCard(cardTemplate, elem.name, elem.link, deleteCard, likeCard));
});

// Сделаем плавно всем попапам
document.querySelectorAll('.popup').forEach( (pop) => {
  pop.classList.add('popup_is-animated');
});

// Модальные окна
editButton.addEventListener('click', (evt) => {
  addPopupListener(evt, popupEdit);  
});

editForm.addEventListener('submit', handleFormSubmit);

addButton.addEventListener('click', (evt) => {
  addPopupListener(evt, popupNewCard);
});

addForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCardTitle = addForm.elements['place-name'].value;
  const newCardLink = addForm.elements['link'].value;
  const newElem = createCard(cardTemplate, newCardTitle, newCardLink, deleteCard, likeCard);
  cardList.insertBefore(newElem, cardList.firstChild);
  document.querySelector(".popup_is-opened").classList.remove('popup_is-opened');
  addForm.reset();
});

cardList.addEventListener('click', handleImage);