import { View } from "./view.js";

export class LinksView extends View {
  _parentElement = document.querySelector(".links-view");

  _generateMarkup() {
    return `<a href="${this._data.link}">${this._data.text}</a>`;
  }
}

export default new LinksView();
