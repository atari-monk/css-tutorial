
export class LinkListView {

  addHandlerRender(handler) {
    ["load"].forEach((ev) => window.addEventListener(ev, handler));
  }

  createContent(data) {
    document.body.appendChild(nav);
  }
}

export default new LinkListView();