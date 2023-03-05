import { View } from "./view.js";

export class NotesView extends View {
  _parentElement = document.querySelector(".notes-view");

  _generateMarkup() {
    return `<p>${this._data.test}</p>`;
  }
}

export default new NotesView();
