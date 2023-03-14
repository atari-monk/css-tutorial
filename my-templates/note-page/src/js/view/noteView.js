import * as tool from './../tool.js';

export class NoteView {
  createContent(data) {
    const notes = data.filter((note) => note.type === 'note');
    const noteTemplate = document.getElementById('template-note');
    const noteEl = noteTemplate.content.querySelector('.note');
    const asideTemplate = document.getElementById('template-note-aside');
    const asideEl = asideTemplate.content.querySelector('aside');
    let newNote, i;
    notes.forEach((note) => {
      newNote = this.#createNote(newNote, noteEl, note);
      const textEl = newNote.querySelector('.note-text');
      if (note.params) {
        console.log('bum');
        this.#createAside(asideEl, note, textEl);
      }
      document.body.appendChild(newNote);
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

  #createNote(newNote, noteEl, note) {
    newNote = document.importNode(noteEl, true);
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
    return newNote;
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
