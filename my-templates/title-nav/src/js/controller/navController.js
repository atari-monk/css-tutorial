import model from "./../model.js";
import { DEBUG } from "./../config.js";
import navView from "./../view/navView.js";
import detectOsView from "./../view/detectOsView.js"
import styleBtnView from "./../view/styleBtnView.js"

class NavController {

  constructor() {
    navView.addHandlerRender(this.#controlNav.bind(this));
  }

  async #controlNav() {
    try {
      const data = await model.loadJson('test');
      DEBUG && console.log(data);
      const detectOsEl = detectOsView.createContent();
      const styleBtnEl = styleBtnView.createContent();
      navView.createContent(data, detectOsEl, styleBtnEl);
    } catch (err) {
      DEBUG && console.log(err);
    }
  }
}

new NavController();