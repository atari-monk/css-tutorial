import { DEBUG } from "../config.js";

export class Controller {
  _page;

  _setPage() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this._page = urlParams.get("page");
    DEBUG && console.log(this._page);
  }
}
