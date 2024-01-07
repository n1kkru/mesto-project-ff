// Импорты
import './index.css';
import {createCard, deleteElement, likeCard} from './components/card.js';
import {openModal, closeModal, closeByClick} from './components/modal.js';
import {clearValidation, enableValidation} from './components/validation.js';
import {getInitialCards, getUser, updateProfile, postCard, updateAvatar} from './components/api.js';

// DOM узлы
// список карт
const cardList = document.querySelector('.places__list');
// модальные окна
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupAvatarChange = document.querySelector('.popup_type_avatar');
// const popupConfirm = document.querySelector('.popup_type_confirm');

// кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
// аватар, имя профиля и подпись
const profileImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
// формы 
const editForm = document.forms['edit-profile'];
const addForm = document.forms['new-place'];
const avatarForm = document.forms['avatar-change'];
// поля формы добавления
const newCardTitle = addForm.elements['place-name'];
const newCardLink = addForm.elements['link'];
// поля формы редактирования
const editProfileName = editForm.elements['name']; 
const editProfileDesc = editForm.elements['description']; 
// данные попапа изображения
const popupContentImage = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');
// поля ссылки на аватар
const avatarLink = avatarForm.elements['avatar-link'];

Promise.all([getUser(), getInitialCards()])
  .then(([userData, cardsData]) => {
    // мое ID
    const  myID = userData._id;

    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.src = userData.avatar;

    cardsData.forEach((elem) => {
      cardList.append(createCard(
        {
        title: elem.name,  // название
        img: elem.link,     // ссылка
        likesList: elem.likes, // количество лайков
        cardID: elem._id,               // идентификатор карточки
        isAuthor: elem.owner._id === myID, // true, если я - автор 
        myID: myID
        }, 
        deleteElement, likeCard, handlerImage));
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Сделаем плавно всем попапам и добавим слушатель закрытия по клику
document.querySelectorAll('.popup').forEach( (pop) => {
  pop.classList.add('popup_is-animated');
  pop.addEventListener('click', closeByClick);
});

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__message-error-activ'
});

// Слушатель открытия окна изменения автара
profileImage.addEventListener('click', () => {
  popupAvatarChange.querySelector('.popup__button').textContent = 'Сохранить';
  openModal(popupAvatarChange);
  avatarLink.value = profileImage.src;
})
// Слушатель кнопки применить
popupAvatarChange.addEventListener('submit', (evt) => {
  popupAvatarChange.querySelector('.popup__button').textContent = 'Сохранение...';
  evt.preventDefault();
  profileImage.src = avatarLink.value;
  updateAvatar(avatarLink.value)
    .catch((err) => {
      console.log(err);
    })
    .finally( () => {
      closeModal(popupAvatarChange);
    });
});


// Слушатель открытия окна редактирования
editButton.addEventListener('click', () => {
  editForm.querySelector('.popup__button').textContent = 'Сохранить';
  clearValidation(editForm, {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__message-error-activ'
  });

  editProfileName.value = profileTitle.textContent;
  editProfileDesc.value = profileDescription.textContent;
  openModal(popupEdit);
});
// Слушатель кнопки применить
editForm.addEventListener('submit', handlerFormSubmit);


// Слушатель открытия окна добавления
addButton.addEventListener('click', () => {
  addForm.querySelector('.popup__button').textContent = 'Сохранить';
  openModal(popupNewCard);
  addForm.reset();
});
// Слушатель кнопки применить
addForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  popupNewCard.querySelector('.popup__button').textContent = 'Сохранение...';

  // отправить данные на сервер
  postCard(newCardTitle.value, newCardLink.value)
      .then( (res) => res.json())
      .then( (data) => {
        const myID = getUser().then( user => user._id);
        const newElem = createCard(
          {title: data.name,
          img: data.link,
          likesList: data.likes,
          cardID: data._id, 
          isAuthor: true,
          myID: myID},
          deleteElement, likeCard, handlerImage);
        cardList.prepend(newElem);;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally( () => {
        closeModal(popupNewCard)});
});

// обработчик кнопки в редакторе профиля
function handlerFormSubmit(evt) {
  evt.preventDefault(); 
  popupEdit.querySelector('.popup__button').textContent = 'Сохранение...';
  profileTitle.textContent = editProfileName.value;
  profileDescription.textContent = editProfileDesc.value;
  // обновление данных на сервере
  updateProfile(profileTitle.textContent, profileDescription.textContent)
    .catch((err) => {
      console.log(err);
    })
    .finally( () => {closeModal(popupEdit)});
}

// Функция открытия изображения
function handlerImage(evt) {
  popupContentImage.src = evt.target.src;
  popupContentImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;    
  openModal(popupImage);
}