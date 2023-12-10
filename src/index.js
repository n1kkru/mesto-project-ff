// Импорты
import './index.css';
import {initialCards} from './components/cards.js';
import {createCard, deleteCard, likeCard, handleImage} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';


// DOM узлы
// список карт
const cardList = document.querySelector('.places__list');
// модальные окна
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
// кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
// имя профиля и подпись
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
// формы 
const editForm = document.forms['edit-profile'];
const addForm = document.forms['new-place'];
// поля формы добавления
const newCardTitle = addForm.elements['place-name'];
const newCardLink = addForm.elements['link'];
// поля формы редактирования
const editProfileName = editForm.elements['name']; 
const editProfileDesc = editForm.elements['description']; 


// Вывести карточки на страницу
initialCards.forEach((elem) => {
  cardList.append(createCard(elem.name, elem.link, deleteCard, likeCard, handleImage));
});

// Сделаем плавно всем попапам
document.querySelectorAll('.popup').forEach( (pop) => {
  pop.classList.add('popup_is-animated');
});


// Слушатель открытия окна редактирования
editButton.addEventListener('click', () => {
  editProfileName.value = profileTitle.textContent;
  editProfileDesc.value = profileDescription.textContent;
  openModal(popupEdit);  
});
// Слушатель кнопки применить
editForm.addEventListener('submit', handleFormSubmit);


// Слушатель открытия окна добавления
addButton.addEventListener('click', () => {
  openModal(popupNewCard);
  addForm.reset();
});

// Слушатель кнопки применить
addForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newElem = createCard(newCardTitle.value, newCardLink.value, deleteCard, likeCard, handleImage);
  cardList.prepend(newElem, cardList.firstChild);
  closeModal(popupNewCard);
});

// обработчик кнопки в редакторе профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = editProfileName.value;
  profileDescription.textContent = editProfileDesc.value;
  closeModal(popupEdit);
}