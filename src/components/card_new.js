export default class Card {
  static _template = document.querySelector('#template_card');

  constructor({name, link, likes, owner, _id}, userId, handelLikeCard, deleteCard, openPopupCard) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._owner = owner;
    this._id = _id;
    this._userId = userId;
    this._handelLikeCard = handelLikeCard;
    this._deleteCard = deleteCard;
    this._openPopupCard = openPopupCard;
  }
  
  _addLike(res) {
    this._countLike.textContent = res.likes.length;
    this._buttonLike.classList.add('card__like-button_active');
  }

  _deleteLike(res) {
    this._countLike.textContent = res.likes.length;
    this._buttonLike.classList.remove('card__like-button_active');
  }

  _addEventListenerButtonLike() {
    this._buttonLike.addEventListener('click', () => {
      this._handelLikeCard(this._buttonLike, this._id)
    })
  }

  _addEventListenerButtonTrash() {
    this._buttonTrash.addEventListener('click', () => {
      this._deleteCard(this._id)
    })
  }

  _addEventListenerImage() {
    this._image.addEventListener('click', () => {
      this._openPopupCard(this._name, this._link)
    })
  }

  _setEventListener() {
    this._addEventListenerButtonLike();
    this._addEventListenerButtonTrash();
    this._addEventListenerImage();
  }

  _compareId() {
    if (this._owner._id !== this._userId) {
      this._buttonTrash.remove()
    }
  }

  _renderLikes() {
    if (this._likes.find((card) => card._id === this._userId)) {
      this._buttonLike.classList.add('card__like-button_active');
    }
  }
  

  createCard() {
    this._element = Card._template.content.querySelector('li').cloneNode(true);
    this._image = this._element.querySelector('.card__image');
    this._countLike = this._element.querySelector('.card__like-count');
    this._buttonLike = this._element.querySelector('.card__like-button');
    this._buttonTrash = this._element.querySelector('.card__trash-button');
    this._element.querySelector('.card__title').textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;
    this._countLike.textContent = this._likes.length;
    this._element.dataset.id = this._id;
    
    this._compareId();
    this._renderLikes();

    this._setEventListener()
    return this._element
  }
}