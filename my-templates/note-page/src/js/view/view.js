export class View {
  _filterOne(data, filter) {
    return data.filter((item) => item.type === filter)[0];
  }

  _filterMany(data, filter) {
    return data.filter((item) => item.type === filter);
  }

  _getParentElement(templateName, selector) {
    const template = document.getElementById(templateName);
    return template.content.querySelector(selector);
  }

  _getNewParent(parentElement) {
    return document.importNode(parentElement, true);
  }

  _templateText(element, selector, template, data) {
    const childEl = element.querySelector(selector);
    childEl.textContent = childEl.textContent.replace(
      new RegExp(`{%${template.toUpperCase()}%}`),
      data
    );
  }

  _templateHtml(element, template, data) {
    element.innerHTML = element.innerHTML.replace(
      new RegExp(`{%${template.toUpperCase()}%}`),
      data
    );
  }

  _templateLink(element, template, data) {
    const linkEl = element.querySelector('a');
    linkEl.setAttribute('href', data.link);
    linkEl.textContent = linkEl.textContent.replace(
      new RegExp(`{%${template.toUpperCase()}%}`),
      data.text
    );
  }

  _setAttribute(data, propName, element, attributeName) {
    if (data.hasOwnProperty(propName) === false) return;
    element.setAttribute(attributeName, data[propName]);
  }

  _hideElement(data, propName, element, selector, cssClass) {
    if (data.hasOwnProperty(propName) === false || data[propName] === true)
      return;
    const childEl = element.querySelector(selector);
    childEl.classList.add(cssClass);
  }
}
