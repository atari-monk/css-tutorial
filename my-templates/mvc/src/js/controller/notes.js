import { DEBUG } from "../config.js";
import { Controller } from "./controller.js";
import model from "../model.js";
import emptyView from "../view/emptyView.js";
import notesView from "../view/notesView.js";

class NotesController extends Controller {

  constructor() {
    super();
    emptyView.addHandlerRender(this.#controlNotes.bind(this));
  }

  async #controlNotes() {
    try {
      this._setPage();
      const data = await model.getPage(this._page);
      DEBUG && console.log(data);
      notesView.render(data);
    } catch (err) { }
  }
}

new NotesController();
