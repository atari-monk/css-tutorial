export class SourceView {
  createContent(data) {
    const source = data.filter((note) => note.type === 'source')[0];
    const sourceTemplate = document.getElementById('template-source');
    const sourceEl = sourceTemplate.content.querySelector('section');
    const linkTemplate = document.getElementById('template-source-link');
    const itemEl = linkTemplate.content.querySelector('li');
    document.body.appendChild(this.#createSource(source, sourceEl, itemEl));
  }

  #createSource(source, sourceEl, itemEl) {
    const newSource = document.importNode(sourceEl, true);
    const titleEl = newSource.querySelector('h2');
    titleEl.textContent = titleEl.textContent.replace(
      /{%TITLE%}/g,
      `${source.title}\n`
    );
    const listEl = newSource.querySelector('ul');
    let newItem;
    source.links.forEach((link) => {
      newItem = document.importNode(itemEl, true);
      const linkEl = newItem.querySelector('a');
      linkEl.setAttribute('href', link.link);
      linkEl.textContent = linkEl.textContent.replace(
        /{%LINK_TEXT%}/g,
        `${link.text}\n`
      );
      listEl.appendChild(newItem);
    });
    return newSource;
  }
}

export default new SourceView();
