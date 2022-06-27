import {openPopup} from './modal.js';
import {imageClick, imageSubtitle, popupImage, templateCard} from './utils.js';

export function createCard(name, link) {
  const templateElement = cardClone()
  const buttonLike = templateElement.querySelector('.card__like-button');
  const buttonTrash = templateElement.querySelector('.card__trash-button');
  const image = templateElement.querySelector('.card__image');

  templateElement.querySelector('.card__title').textContent = name;
  image.src = link;
  image.alt = name;
  
  setEventListner(buttonLike, buttonTrash, templateElement)
  //Обработчик просмотра картинки
  image.addEventListener('click', () => {
    openPopup(popupImage); //Открытие модалки
    imageClick.src = link; //Заменяем картинку
    imageClick.alt = name; //Прописываем alt
    imageSubtitle.textContent = name; //Заменяем подпись      
  });

  return templateElement;
};

function setEventListner(like, trash, card) {
  like.addEventListener('click', () => like.classList.toggle('card__like-button_active')); //Добавление обработчика лайков
  trash.addEventListener('click', () => card.remove()); //Добавление обработчика удаление карточки
}

function cardClone() {
  const element = templateCard.querySelector('li').cloneNode(true);
  return  element;
}