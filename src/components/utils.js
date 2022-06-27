//Переменные модалки редактирования профиля
export const popupInfo = document.querySelector('#popup_info');
export const nameInput = popupInfo.querySelector('.popup__input_info_name');
export const jobInput = popupInfo.querySelector('.popup__input_info_profession');
export const closeButtonPopupInfo = popupInfo.querySelector('.popup__button');
export const formPopupInfo = popupInfo.querySelector('form');

//Переменные профиля
export const openButtonPopupInfo = document.querySelector('.profile__edit');
export const nameProfile = document.querySelector('.profile__name');
export const professionProfile = document.querySelector('.profile__profession');

//Переменные модалки карточки
export const popupCard = document.querySelector('#popup_card');
export const openButtonPopupCard = document.querySelector('.profile__add');
export const closeButtonPopupCard = popupCard.querySelector('.popup__button');
export const formPopupCard = popupCard.querySelector('form');
export const popupImageName = popupCard.querySelector('.popup__input_name_image');
export const popupImageUrl = popupCard.querySelector('.popup__input_src_image');  

//Переменные модалки просмотра картинки
export const popupImage = document.querySelector('#popup_image');
export const imageClick = popupImage.querySelector('.popup__image');
export const imageSubtitle = popupImage.querySelector('.popup__subtitle');
export const closeButtonPopupImage = popupImage.querySelector('.popup__button');

export const listCards = document.querySelector('.cards__list');
export const templateCard = document.querySelector('#template_card').content;
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];