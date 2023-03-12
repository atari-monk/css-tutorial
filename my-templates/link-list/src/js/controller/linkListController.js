import model from "../model.js";
import { DEBUG } from "../config.js";
import linkListView from "../view/linkListView.js";

class LinkListController {

  constructor() {
    linkListView.addHandlerRender(this.#controlLinkList.bind(this));
  }

  async #controlLinkList() {
    try {
      const data = await model.loadJson('test');
      DEBUG && console.log(data);
      const inkListEl = linkListView.createContent(data);
      document.body.appendChild(inkListEl);
    } catch (err) {
      DEBUG && console.log(err);
    }
  }
}

new LinkListController();