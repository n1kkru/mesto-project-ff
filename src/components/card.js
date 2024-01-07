import {removeCard, updateLikeValue} from './api.js';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
// cardInfo = {title: , img: , likesList: , cardID: , isAuthor: , myID:}
function createCard(cardInfo, handlerDelete, handlerLike, handlerOpenImage) {
  const cardElem = cardTemplate.querySelector('.card').cloneNode(true);
  
  const cardImage = cardElem.querySelector('.card__image');
  const cardDeleteButton = cardElem.querySelector('.card__delete-button');
  const cardLikeButton = cardElem.querySelector('.card__like-button');
  const cardLikeValue = cardElem.querySelector('.card__like-value');
  const cardId = cardInfo.cardID;

  cardImage.src = cardInfo.img;
  cardImage.alt = cardInfo.title;
  cardLikeValue.textContent = cardInfo.likesList.length;
  cardElem.querySelector('.card__title').textContent = cardInfo.title;

  // проверяем стоит ли лайк
  if (cardInfo.likesList.some( list => list._id === cardInfo.myID)) {
    cardLikeButton.classList.toggle('card__like-button_is-active');
  };

  // если я автор карточки, то добавить слушатель кнопки удаления
  if (cardInfo.isAuthor) {
    cardDeleteButton.addEventListener('click', () => {
      // удаляем с сервера и с разметки
      removeCard(cardId)
        .then( () => {
          handlerDelete(cardElem);
        })
        .catch((err) => {
          console.log(err);
        });
      }
    ); 
  } 
  // иначе убрать возможность удаления
  else {
    handlerDelete(cardDeleteButton);
  }

  cardImage.addEventListener('click', (evt) => {
    handlerOpenImage(evt);
  });

  cardLikeButton.addEventListener('click', (evt) => {

    const isLiked = evt.target.classList.contains('card__like-button_is-active');
    // изменяем кнопку
    handlerLike(evt);
    // вносим изменения на сервер и изменяем число лайков
    updateLikeValue(cardId, isLiked)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then( (data) => {
        cardLikeValue.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return cardElem;
}

// Функция удаления элемента
function deleteElement(cardElement) {  
  cardElement.remove();
}; 

// изменение кнопки
const likeCard = (evt) => { 
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
}

export {createCard, deleteElement, likeCard};