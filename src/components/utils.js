export const popups = document.querySelectorAll('.popup');
export const body = document.querySelector('body');
//Переменные модалки редактирования профиля
export const popupInfo = document.querySelector('#popup_info');
export const nameInput = popupInfo.querySelector('.popup__input_info_name');
export const jobInput = popupInfo.querySelector('.popup__input_info_profession');
export const formPopupInfo = popupInfo.querySelector('.popup__form');
export const buttonSubmitInfo = popupInfo.querySelector('.popup__submit');

//Переменные профиля
export const openButtonPopupInfo = document.querySelector('.profile__edit');
export const nameProfile = document.querySelector('.profile__name');
export const professionProfile = document.querySelector('.profile__profession');

//Переменные модалки карточки
export const popupCard = document.querySelector('#popup_card');
export const openButtonPopupCard = document.querySelector('.profile__add');
export const formPopupCard = popupCard.querySelector('.popup__form');
export const popupImageName = popupCard.querySelector('.popup__input_name_image');
export const popupImageUrl = popupCard.querySelector('.popup__input_src_image');
export const buttonSubmitCard = popupCard.querySelector('.popup__submit');

//Переменные модалки просмотра картинки
export const popupImage = document.querySelector('#popup_image');
export const imageClick = popupImage.querySelector('.popup__image');
export const imageSubtitle = popupImage.querySelector('.popup__subtitle');

export const popupAvatar = document.querySelector('#popup_avatar');
export const openButtonPopupAvatar = document.querySelector('.profile__avatar-edit');
export const popupAvatarUrl = popupAvatar.querySelector('.popup__input_src_avatar');
export const formPopupAvatar = popupAvatar.querySelector('.popup__form');
export const avatarImage = document.querySelector('.profile__avatar');
export const buttonSubmitAvatar = popupAvatar.querySelector('.popup__submit');

export const popupDeleteCard = document.querySelector('#popup_delete-card');
export const formPopupDeleteCard = popupDeleteCard.querySelector('.popup__form');

export const listCards = document.querySelector('.cards__list');
export const templateCard = document.querySelector('#template_card').content;

export const valueConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
}

const config = {
  url: 'https://nomoreparties.co/v1/plus-cohort-12',
  token: 'ae6caf2d-a00b-4726-a9ec-c3ff5914df0b'
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