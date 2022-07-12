import {closePopup, openPopup} from './modal.js';
import {imageClick, imageSubtitle, popupImage, templateCard, popupDeleteCard, formPopupDeleteCard} from './utils.js';
import {config, deleteCard, deleteLike, putLike} from './api.js'

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
  
  if (likes.find((card) => card._id === config.userId)) {
    buttonLike.classList.add('card__like-button_active');
  }
  
  setEventListner(buttonLike, buttonTrash, templateElement, image, name, link, _id, countLikes)
  return templateElement;
};

function setEventListner(like, trash, card, image, name, link, id, countLikes) {
  like.addEventListener('click', () => {
    if (like.classList.contains('card__like-button_active')) {
      deleteLike(id)
        .then(res => {
          countLikes.textContent = res.likes.length;
          like.classList.remove('card__like-button_active');
        })
        .catch(err => console.log(err));
      
    } else if (!like.classList.contains('card__like-button_active')) {
      putLike(id)
        .then(res => {
          countLikes.textContent = res.likes.length;
          like.classList.add('card__like-button_active');
        })
        .catch(err => console.log(err))
    }
  });
  trash.addEventListener('click', () => {
    openPopup(popupDeleteCard);
    formPopupDeleteCard.addEventListener('submit', () => {
      deleteCard(id);
      card.remove();
      closePopup(popupDeleteCard);
    })
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