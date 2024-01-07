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
const submitAvatarButton = popupAvatarChange.querySelector('.popup__button');
const submitbuttonOpenEditProfilePopup = popupEdit.querySelector('.popup__button');
const submitNewCardButton = popupNewCard.querySelector('.popup__button');
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
// аватар, имя профиля и подпись
const allPopup = document.querySelectorAll('.popup');
const profileImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
// формы 
const formEditProfile = document.forms['edit-profile'];
const formAddCard = document.forms['new-place'];
const avatarForm = document.forms['avatar-change'];
// поля формы добавления
const newCardTitle = formAddCard.elements['place-name'];
const newCardLink = formAddCard.elements['link'];
// поля формы редактирования
const editProfileName = formEditProfile.elements['name']; 
const editProfileDesc = formEditProfile.elements['description']; 
// данные попапа изображения
const popupContentImage = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');
// поля ссылки на аватар
const avatarLink = avatarForm.elements['avatar-link'];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__message-error-activ'
};

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
allPopup.forEach( (popup) => {
  popup.classList.add('popup_is-animated');
  popup.addEventListener('click', closeByClick);
});

enableValidation(validationConfig);


// Слушатель открытия окна изменения автара
profileImage.addEventListener('click', () => {
  clearValidation(validationConfig, avatarForm);
  submitAvatarButton.textContent = 'Сохранить';
  openModal(popupAvatarChange);
})
// Слушатель кнопки применить
popupAvatarChange.addEventListener('submit', (evt) => {
  submitAvatarButton.textContent = 'Сохранение...';
  evt.preventDefault();
  updateAvatar(avatarLink.value)
    .then( () => {
      profileImage.src = avatarLink.value;
      closeModal(popupAvatarChange);
    })
    .catch((err) => {
      console.log(err);
    })
});


// Слушатель открытия окна редактирования
buttonOpenEditProfilePopup.addEventListener('click', () => {
  clearValidation(validationConfig, formEditProfile);

  submitbuttonOpenEditProfilePopup.textContent = 'Сохранить';
  editProfileName.value = profileTitle.textContent;
  editProfileDesc.value = profileDescription.textContent;

  openModal(popupEdit);
});
// Слушатель кнопки применить
formEditProfile.addEventListener('submit', submitEditProfileForm);


// Слушатель открытия окна добавления
buttonOpenAddCardPopup.addEventListener('click', () => {
  clearValidation(validationConfig, formAddCard);
  submitNewCardButton.textContent = 'Сохранить';
  openModal(popupNewCard);
  formAddCard.reset();
});
// Слушатель кнопки применить
formAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  submitNewCardButton.textContent = 'Сохранение...';

  // отправить данные на сервер
  postCard(newCardTitle.value, newCardLink.value)
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
        cardList.prepend(newElem);
      closeModal(popupNewCard);
      })
      .catch((err) => {
        console.log(err);
      })
});

// обработчик кнопки в редакторе профиля
function submitEditProfileForm(evt) {
  evt.preventDefault(); 
  submitbuttonOpenEditProfilePopup.textContent = 'Сохранение...';
  updateProfile(profileTitle.textContent, profileDescription.textContent)
    .then( () => {
      profileTitle.textContent = editProfileName.value;
      profileDescription.textContent = editProfileDesc.value;
      closeModal(popupEdit);
    })
    .catch((err) => {
      console.log(err);
    })
}

// Функция открытия изображения
function handlerImage(evt) {
  popupContentImage.src = evt.target.src;
  popupContentImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;    
  openModal(popupImage);
}