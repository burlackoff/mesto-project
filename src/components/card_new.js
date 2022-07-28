export default class Card {
  constructor({name, link, likes, owner, _id}, selector, userId, handelLikeCard, deleteCard, openPopupCard) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._owner = owner;
    this._id = _id;
    this._selector = selector;
    this._userId = userId;
    this._handelLikeCard = handelLikeCard;
    this._deleteCard = deleteCard;
    this._openPopupCard = openPopupCard;
  }

  _getCardTemplate() {
    return document.querySelector(`${this._selector}`).content.querySelector('li').cloneNode(true)
  }
  
  _setEventListener() {
    this._buttonLike.addEventListener('click', () => {
      this._handelLikeCard(this._buttonLike, this._id, this._countLike)
    })
    this._buttonTrash.addEventListener('click', () => {
      this._deleteCard(this._id)
    })
    this._image.addEventListener('click', () => {
      this._openPopupCard(this._name, this._link)
    })
  }

  createCard() {
    this._element = this._getCardTemplate();
    this._image = this._element.querySelector('.card__image');
    this._countLike = this._element.querySelector('.card__like-count');
    this._buttonLike = this._element.querySelector('.card__like-button');
    this._buttonTrash = this._element.querySelector('.card__trash-button');
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.dataset.id = this._id;
    this._element.querySelector('.card__title').textContent = this._name;
    
    if (this._owner._id !== this._userId) {
      this._buttonTrash.remove()
    }

    if (this._likes.length !== 0) {
      this._countLike.textContent = this._likes.length;
    }

    if (this._likes.find((card) => card._id === this._userId)) {
      this._buttonLike.classList.add('card__like-button_active');
    }

    this._setEventListener()
    return this._element
  }
}