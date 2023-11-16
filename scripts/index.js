// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(title, img) {
  const cardElem = cardTemplate.querySelector('.card').cloneNode(true);
  cardElem.querySelector('.card__image').src = img;
  cardElem.querySelector('.card__image').alt = title;
  cardElem.querySelector('.card__title').textContent = title;

  cardElem.querySelector('.card__delete-button').addEventListener('click', deleteCard); 

  return cardElem;
}

// @todo: Функция удаления карточки
const deleteCard = (evt) =>  evt.target.parentElement.remove();

// @todo: Вывести карточки на страницу
initialCards.forEach(function (elem) {
  cardList.append(createCard(elem.name, elem.link));
})
