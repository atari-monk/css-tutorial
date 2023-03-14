export class DescriptionView {
  createContent(data) {
    const description = data.filter((note) => note.type === 'description')[0];
    const descriptionTemplate = document.getElementById('template-description');
    const descriptionEl = descriptionTemplate.content.querySelector('section');
    document.body.appendChild(
      this.#createDescription(description, descriptionEl)
    );
  }

  #createDescription(description, descriptionEl) {
    const newDescription = document.importNode(descriptionEl, true);
    const titleEl = newDescription.querySelector('h2');
    titleEl.textContent = titleEl.textContent.replace(
      /{%TITLE%}/g,
      `${description.title}\n`
    );
    const textEl = newDescription.querySelector('p');
    textEl.textContent = textEl.textContent.replace(
      /{%TEXT%}/g,
      `${description.description.join('')}\n`
    );
    if (description.navId) {
      newDescription.setAttribute('id', description.navId);
    }
    return newDescription;
  }
}

export default new DescriptionView();
