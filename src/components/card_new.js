class Card {
  constructor({name, link, likes, owner, id}, selector) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._owner = owner;
    this._id = id;
    this._selector = selector
  }

  _getCardTemplate() {
    return document.querySelector(`${selector}`).content.querySelector('li').cloneNode(true)
  }

  _getLikes() {
    return this._likes !== 0 ? countLikes.textContent = likes.length : false
  }

  _getCard() {
    const element = this._getCardTemplate();
    const image = element.querySelector('.card__image');
    element.querySelector('.card__title').textContent = this._name;
    image.src = this._link;
    image.alt = this._name;
  }
  createCard() {
    return this.card
  }
}