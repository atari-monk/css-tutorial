import model from "./../model.js";
import { DEBUG } from "./../config.js";
import navView from "./../view/navView.js";
import detectOsView from "./../view/detectOsView.js"
import styleBtnView from "./../view/styleBtnView.js"
import linkListView from "./../view/linkListView.js";

class IndexController {

  constructor() {
    navView.addHandlerRender(this.#controlNav.bind(this));
  }

  async #controlNav() {
    try {
      const data = await model.loadJson('index/index');
      DEBUG && console.log(data);
      const detectOsEl = detectOsView.createContent();
      const styleBtnEl = styleBtnView.createContent();
      navView.createContent(data, detectOsEl, styleBtnEl);
      linkListView.createContent(data);
    } catch (err) {
      console.log(err);
    }
  }
}

new IndexController();