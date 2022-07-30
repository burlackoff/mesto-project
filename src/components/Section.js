export default class Section {
  constructor({items: items, renderer: renderer}, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  rendererItems() {
    this._items.reverse().forEach(item => {
      this.addItem(this._renderer(item))
    })
  }

  addItem(item) {
    this._container.prepend(item)
  }
}