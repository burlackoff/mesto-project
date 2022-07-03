import {openPopup} from './modal.js';
import {imageClick, imageSubtitle, popupImage, templateCard} from './utils.js';
import {config, deleteCard} from './api.js'


export function createCard(cardData) {
  const {name, link, likes, owner, _id} = cardData;
  const templateElement = getCardTemplate()
  const countLikes = templateElement.querySelector('.card__like-count');
  const buttonLike = templateElement.querySelector('.card__like-button');
  const buttonTrash = templateElement.querySelector('.card__trash-button');
  const image = templateElement.querySelector('.card__image');

  templateElement.querySelector('.card__title').textContent = name;
  image.src = link;
  image.alt = name;

  if (likes.length !== 0) {
    countLikes.textContent = likes.length;
  }

  if (owner._id !== config.userId) {
    buttonTrash.remove()
  }

  setEventListner(buttonLike, buttonTrash, templateElement, image, name, link, _id)
  return templateElement;
};

function setEventListner(like, trash, card, image, name, link, id) {
  like.addEventListener('click', () => like.classList.toggle('card__like-button_active')); //Добавление обработчика лайков
  trash.addEventListener('click', () => {
    card.remove();
    deleteCard(id)
  });
  image.addEventListener('click', () => {
    openPopup(popupImage); //Открытие модалки
    imageClick.src = link; //Заменяем картинку
    imageClick.alt = name; //Прописываем alt
    imageSubtitle.textContent = name; //Заменяем подпись      
  });
}

function getCardTemplate() {
  const element = templateCard.querySelector('li').cloneNode(true);
  return  element;
}