export class PreconditionView {
  createContent(data) {
    const precondition = data.filter((note) => note.type === 'precondition')[0];
    const preconditionTemplate = document.getElementById(
      'template-precondition'
    );
    const preconditionEl =
      preconditionTemplate.content.querySelector('section');
    const itemTemplate = document.getElementById('template-precondition-item');
    const itemEl = itemTemplate.content.querySelector('li');
    document.body.appendChild(
      this.#createPrecondition(precondition, preconditionEl, itemEl)
    );
  }

  #createPrecondition(precondition, preconditionEl, itemEl) {
    const newPrecondition = document.importNode(preconditionEl, true);
    const titleEl = newPrecondition.querySelector('h2');
    titleEl.textContent = titleEl.textContent.replace(
      /{%TITLE%}/g,
      `${precondition.title}\n`
    );
    const listEl = newPrecondition.querySelector('ul');
    let newItem;
    precondition.list.forEach((text) => {
      newItem = document.importNode(itemEl, true);
      const textEl = newItem.querySelector('p');
      textEl.textContent = textEl.textContent.replace(
        /{%TEXT%}/g,
        `${text}\n`
      );
      listEl.appendChild(newItem);
    });
    return newPrecondition;
  }
}

export default new PreconditionView();
