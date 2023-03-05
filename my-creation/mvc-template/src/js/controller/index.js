import { DEBUG } from "../config.js";
import { Controller } from "./controller.js";
import model from "../model.js";
import emptyView from "../view/emptyView.js";
import linksList from "../view/linksView.js";

class IndexController extends Controller {

  constructor() {
    super();
    emptyView.addHandlerRender(this.#controlIndex.bind(this));
  }

  async #controlIndex() {
    try {
      this._setPage();
      const data = await model.getPage(this._page ?? 'index');
      DEBUG && console.log(data);
      linksList.render(data);
    } catch (err) { }
  }
}

new IndexController();
