import {openPopup} from './modal.js';
import {imageClick, imageSubtitle, popupImage} from './utils.js';

const templateCard = document.querySelector('#template_card').content;

export function createCard(name, link) {
  const templateElement = templateCard.querySelector('li').cloneNode(true);  
  const buttonLike = templateElement.querySelector('.card__like-button');
  const buttonTrash = templateElement.querySelector('.card__trash-button');
  const image = templateElement.querySelector('.card__image');

  templateElement.querySelector('.card__title').textContent = name;
  image.src = link;
  image.alt = name;
  
  buttonLike.addEventListener('click', () => buttonLike.classList.toggle('card__like-button_active')); //Добавление обработчика лайков
  buttonTrash.addEventListener('click', () => templateElement.remove()); //Добавление обработчика удаление карточки
  //Обработчик просмотра картинки
  image.addEventListener('click', () => {
    openPopup(popupImage); //Открытие модалки
    imageClick.src = link; //Заменяем картинку
    imageClick.alt = name; //Прописываем alt
    imageSubtitle.textContent = name; //Заменяем подпись      
  });

  return templateElement;
};
