import {config} from './api.js'

//Переменные модалки редактирования профиля
export const popupInfo = document.querySelector('#popup_info');
export const nameInput = popupInfo.querySelector('.popup__input_info_name');
export const jobInput = popupInfo.querySelector('.popup__input_info_profession');
export const closeButtonPopupInfo = popupInfo.querySelector('.popup__button');
export const formPopupInfo = popupInfo.querySelector('.popup__form');

//Переменные профиля
export const openButtonPopupInfo = document.querySelector('.profile__edit');
export const nameProfile = document.querySelector('.profile__name');
export const professionProfile = document.querySelector('.profile__profession');

//Переменные модалки карточки
export const popupCard = document.querySelector('#popup_card');
export const openButtonPopupCard = document.querySelector('.profile__add');
export const closeButtonPopupCard = popupCard.querySelector('.popup__button');
export const formPopupCard = popupCard.querySelector('.popup__form');
export const popupImageName = popupCard.querySelector('.popup__input_name_image');
export const popupImageUrl = popupCard.querySelector('.popup__input_src_image');  

//Переменные модалки просмотра картинки
export const popupImage = document.querySelector('#popup_image');
export const imageClick = popupImage.querySelector('.popup__image');
export const imageSubtitle = popupImage.querySelector('.popup__subtitle');
export const closeButtonPopupImage = popupImage.querySelector('.popup__button');

export const popupAvatar = document.querySelector('#popup_avatar');
export const openButtonPopupAvatar = document.querySelector('.profile__avatar-edit');
export const closeButtonPopupAvatar = popupAvatar.querySelector('.popup__button');
export const popupAvatarUrl = popupAvatar.querySelector('.popup__input_src_avatar');
export const formPopupAvatar = popupAvatar.querySelector('.popup__form');

export const listCards = document.querySelector('.cards__list');
export const templateCard = document.querySelector('#template_card').content;

export const valueConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
}

export const cardConfig = {
  name: "",
  link: "",
  likes: [],
  owner: {
    name: "",
    about: "",
    avatar: "",
    _id: `${config.userId}`
  },
  _id: ""
}