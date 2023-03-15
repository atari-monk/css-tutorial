import * as tool from './../tool.js';
import { View } from './view.js';

export class NoteView extends View {
  createContent(data) {
    const notes = this._filterMany(data, 'note');
    const noteEl = this._getParentElement('template-note', '.note');
    const asideEl = this._getParentElement('template-note-aside', 'aside');
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
    const newAside = this._getNewParent(asideEl);
    const parentEl = newAside.querySelector('p');
    const markEl = this._getParentElement('template-note-mark', 'mark');
    let j = 1;
    let i = 1;
    note.params.forEach((param) => {
      const newMark = this._getNewParent(markEl);
      newMark.classList.add(`mark-${j}`);
      j++;
      i++;
      if (i > 0 && i % 6 === 0) j = 1;
      this._templateElText(newMark, 'description', param?.desc);
      parentEl.appendChild(newMark);
      parentEl.appendChild(this._createBr());
    });
    textEl.appendChild(newAside);
  }

  #createNote(note, noteEl) {
    const newNote = this._getNewParent(noteEl);
    this._templateText(newNote, '.note-title', 'title', note.title);
    const noteTextEl = newNote.querySelector('.note-note');
    if (note.hasOwnProperty('params')) {
      this._templateHtml(
        noteTextEl,
        'note',
        this.#insertParams(note.note.join('\n<br>'), note.params)
      );
    } else {
      this._templateHtml(noteTextEl, 'note', note.note.join('\n<br>'));
    }
    this._setAttribute(note, 'navId', newNote, 'id');
    this._hideElement(note, 'isCopy', newNote, '.note-icon', 'hide');
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
