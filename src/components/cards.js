const arkhyz = "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg";
const chelyabinsk = "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg";
const ivanovo = "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg";
const kamchatka = "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg";
const kholmogorskyRayon = "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg";
const baikal = "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg";

const initialCards = [
    {
      name: "Архыз",
      link: arkhyz,
    },
    {
      name: "Челябинская область",
      link: chelyabinsk,
    },
    {
      name: "Иваново",
      link: ivanovo,
    },
    {
      name: "Камчатка",
      link:kamchatka ,
    },
    {
      name: "Холмогорский район",
      link: kholmogorskyRayon,
    },
    {
      name: "Байкал",
      link: baikal,
    }
];

// Функция создания карточки
function createCard(template, title, img, handler, handlerLike) {
  const cardElem = template.querySelector('.card').cloneNode(true);
  const cardImage = cardElem.querySelector('.card__image');
  cardImage.src = img;
  cardImage.alt = title;
  cardElem.querySelector('.card__title').textContent = title;
  cardElem.querySelector('.card__delete-button').addEventListener('click', handler); 

  return cardElem;
}

// Функция удаления карточки
const deleteCard = (evt) =>  evt.target.parentElement.remove();

// Функция лайка
const likeCard = (evt) => { if (evt.target.classList.contains('card__like-button')) {
  evt.target.classList.toggle('card__like-button_is-active');
}}

export {initialCards, createCard, deleteCard, likeCard};