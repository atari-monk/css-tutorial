import model from "./../model.js";
import { DEBUG } from "./../config.js";
import navView from "./../view/navView.js";
import detectOsView from "./../view/detectOsView.js"
import styleBtnView from "./../view/styleBtnView.js"
import sourceView from './../view/sourceView.js';
import noteView from './../view/noteView.js';
import descriptionView from './../view/descriptionView.js';
import preconditionView from './../view/preconditionView.js';

class IndexController {

  constructor() {
    navView.addHandlerRender(this.#controlNav.bind(this));
  }

  async #controlNav() {
    try {
      const data = await model.loadJson('note/unity-course');
      DEBUG && console.log(data);
      const detectOsEl = detectOsView.createContent();
      const styleBtnEl = styleBtnView.createContent();
      navView.createContent(data, detectOsEl, styleBtnEl);
      sourceView.createContent(data.notes);
      descriptionView.createContent(data.notes);
      preconditionView.createContent(data.notes);
      noteView.createContent(data.notes);
    } catch (err) {
      DEBUG && console.log(err);
    }
  }
}

new IndexController();