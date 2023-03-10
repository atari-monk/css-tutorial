import model from "./model.js";
import { DEBUG } from "./config.js";
import navView from "./navView.js";
import detectOsView from "./detect-os-card/detectOsView.js"

class NavController {

  constructor() {
    navView.addHandlerRender(this.#controlNav.bind(this));
  }

  async #controlNav() {
    try {
      const data = await model.loadJson('test');
      DEBUG && console.log(data);
      const detectOsEl = detectOsView.createContent();
      navView.createContent(data, detectOsEl);
    } catch (err) {
      DEBUG && console.log(err);
    }
  }
}

new NavController();