// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
function createCard(title, img, handlerDelete, handlerLike, handlerOpenImage) {
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
    handlerOpenImage(evt);
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

export {createCard, deleteCard, likeCard};