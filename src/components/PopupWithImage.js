import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._imageSubtitle = this._popup.querySelector('.popup__subtitle');
    this._image = this._popup.querySelector('.popup__image')

  }

  openPopup(name, link) {
    super.openPopup();
    this._image.src = link;
    this._image.alt = name;
    this._imageSubtitle = name;
  }
}