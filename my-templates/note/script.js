import model from "./model.js";
import { DEBUG } from "./config.js";

function addHandlerRender(handler) {
  ["load"].forEach((ev) => window.addEventListener(ev, handler));
}

async function controlIndex() {
  try {
    const data = await model.loadJson('test');
    DEBUG && console.log(data);
    createContent(data);
    let noteTexts = document.querySelectorAll('.note-text');
    let noteCopies = document.querySelectorAll('.note-copy');
    let i = 0;
    noteCopies.forEach(copyText => {
      let noteText = noteTexts[i];
      copyText.addEventListener('click', () => {
        let title = noteText.querySelector('.note-title');
        let text = noteText.querySelector('.note-note');
        var txt = `${title.textContent}${text.textContent}`;
        navigator.clipboard.writeText(txt);
      });
      i++;
    });
  } catch (err) { }
}

function createContent(data) {
  const template = document.getElementsByTagName("template")[0];
  const note = template.content.querySelector(".note");
  let newNode, i;
  for (i = 0; i < data.length; i++) {
    newNode = document.importNode(note, true);
    const titleEl = newNode.querySelector(".note-title");
    titleEl.textContent = titleEl.textContent.replace(/{%TITLE%}/g, `${data[i].title}\n`);
    const noteEl = newNode.querySelector(".note-note");
    DEBUG && console.log(noteEl);
    noteEl.innerHTML = noteEl.textContent.replace(/{%NOTE%}/g, data[i].note.join('\n<br>'));
    document.body.appendChild(newNode);
  }
}

addHandlerRender(controlIndex);