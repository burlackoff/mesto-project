import {openPopup} from './modal.js';
import {imageClick, imageSubtitle} from './data.js';

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

const templateCard = document.querySelector('#template_card').content;
const listCards = document.querySelector('.cards__list');

function creatCard(name, link) {
  const templateElement = templateCard.querySelector('li').cloneNode(true); //клонируем карточку
  const buttonLike = templateElement.querySelector('.card__like-button');
  const buttonTrash = templateElement.querySelector('.card__trash-button');
  const buttonImage = templateElement.querySelector('.card__image');

  templateElement.querySelector('.card__title').textContent = name;
  templateElement.querySelector('.card__image').src = link;
  templateElement.querySelector('.card__image').alt = name;
  
  buttonLike.addEventListener('click', () => buttonLike.classList.toggle('card__like-button_active')); //Добавление обработчика лайков
  buttonTrash.addEventListener('click', () => templateElement.remove()); //Добавление обработчика удаление карточки
  //Обработчик просмотра картинки
  buttonImage.addEventListener('click', () => {
    openPopup(document.querySelector('#popup_image')); //Открытие модалки
    imageClick.src = link; //Заменяем картинку
    imageClick.alt = name; //Прописываем alt
    imageSubtitle.textContent = name; //Заменяем подпись      
  });

  return templateElement;
};

//Вставка карточки в начало списка
function appendCard(card) {
  listCards.prepend(card);
}

//Функция загрузки стартовых карточек
export function renderCard(arrayCard) {
  arrayCard.forEach(item => appendCard(creatCard(item.name, item.link)));
};
