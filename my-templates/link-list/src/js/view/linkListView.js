
export class LinkListView {

  addHandlerRender(handler) {
    ["load"].forEach((ev) => window.addEventListener(ev, handler));
  }

  createContent(data) {
    const template = document.getElementById("template-link-list");
    const sectionEl = template.content.querySelector("article");
    data.sections.forEach(sectionData => {
      const newSection = this.#buildSection(sectionData, sectionEl);
      this.#buildSectionLinks(sectionData, newSection.querySelector("ul"));
      document.body.appendChild(newSection);
    });
  }

  #buildSection(data, sectionEl) {
    let newSection;
    newSection = document.importNode(sectionEl, true);
    const titleEl = newSection.querySelector("h3");
    titleEl.textContent = titleEl.textContent.replace(/{%TITLE%}/g, `${data.text}`);
    return newSection;
  }

  #buildSectionLinks(data, parentEl) {
    const template = document.getElementById("template-link-list-item");
    const item = template.content.querySelector("li");
    let newItem;
    data.links.forEach(linkData => {
      newItem = document.importNode(item, true);
      const newItemLink = newItem.querySelector("a");
      newItemLink.textContent = newItemLink.textContent
        .replace(/{%LINK_TEXT%}/g, `${linkData.text}`);
      newItemLink.setAttribute("href", `${linkData.link}`);
      parentEl.appendChild(newItem);
    });
  }
}

export default new LinkListView();