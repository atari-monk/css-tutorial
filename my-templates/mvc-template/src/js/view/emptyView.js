import { View } from "./view.js";

export class EmptyView extends View {
  _parentElement = '';

  addHandlerRender(handler) {
    ["load"].forEach((ev) => window.addEventListener(ev, handler));
  }

  _generateMarkup() {
    return '';
  }
}

export default new EmptyView();
