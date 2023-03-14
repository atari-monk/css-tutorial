import * as tool from './../tool.js';

export class NoteView {
  createContent(data) {
    const notes = data.filter((note) => note.type === 'note');
    const noteTemplate = document.getElementById('template-note');
    const noteEl = noteTemplate.content.querySelector('.note');
    const asideTemplate = document.getElementById('template-note-aside');
    const asideEl = asideTemplate.content.querySelector('aside');
    notes.forEach((note) => {
      const newNote = this.#createNote(note, noteEl);
      const textEl = newNote.querySelector('.note-text');
      if (note.params) {
        this.#createAside(asideEl, note, textEl);
      }
      document.body.appendChild(newNote);
    });
    this.#setupCopyBtns();
  }

  #setupCopyBtns() {
    let noteTexts = document.querySelectorAll('.note-text');
    let noteCopies = document.querySelectorAll('.note-copy');
    let i = 0;
    noteCopies.forEach((copyText) => {
      let noteText = noteTexts[i];
      copyText.addEventListener('click', () => {
        let title = noteText.querySelector('.note-title');
        let text = noteText.querySelector('.note-note');
        var txt = `${title.textContent}${text.textContent}`;
        navigator.clipboard.writeText(txt);
      });
      i++;
    });
  }

  #createAside(asideEl, note, textEl) {
    const newAside = document.importNode(asideEl, true);
    const parentEl = newAside.querySelector('p');
    let j = 1;
    const detail = note.params
      .map((param, i) => {
        const detail = `<mark class="mark-${j}">${param?.desc}</mark>`;
        j++;
        if (i > 0 && i % 6 === 0) j = 1;
        return detail;
      })
      .join('<br>');
    parentEl.innerHTML = detail;
    textEl.appendChild(newAside);
  }

  #createNote(note, noteEl) {
    const newNote = document.importNode(noteEl, true);
    const titleEl = newNote.querySelector('.note-title');
    titleEl.textContent = titleEl.textContent.replace(
      /{%TITLE%}/g,
      `${note.title}\n`
    );
    const noteTextEl = newNote.querySelector('.note-note');
    if (note.params) {
      noteTextEl.innerHTML = noteTextEl.textContent.replace(
        /{%NOTE%}/g,
        this.#insertParams(note.note.join('\n<br>'), note.params)
      );
    } else {
      noteTextEl.innerHTML = noteTextEl.textContent.replace(
        /{%NOTE%}/g,
        note.note.join('\n<br>')
      );
    }
    if (note.navId) this.#createId(note, newNote);
    if (note.hasOwnProperty('isCopy') && note.isCopy === false) {
      const iconEl = newNote.querySelector('.note-icon');
      iconEl.classList.add('hide');
      console.log(iconEl.classList);
    }
    return newNote;
  }

  #createId(note, newNote) {
    newNote.setAttribute('id', note.navId);
  }

  #insertParams(text, params) {
    return text.format(...this.#getParams(params));
  }

  #getParams(params) {
    let j = 1;
    return params.map((param, i) => {
      const mark = `<mark class="mark-${j}">${param?.name}</mark>`;
      j++;
      if (i > 0 && i % 6 === 0) j = 1;
      return mark;
    });
  }
}

export default new NoteView();
