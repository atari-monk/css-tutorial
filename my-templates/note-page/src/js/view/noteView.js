import * as tool from './../tool.js';
import { View } from './view.js';

export class NoteView extends View {
  createContent(data) {
    const notes = this._filterMany(data, 'note');
    const noteEl = this._getParentElement('template-note', '.note');
    const asideEl = this._getParentElement('template-note-aside', 'aside');
    notes.forEach((note) => {
      const newNote = this.#createNote(note, noteEl);
      if (note.hasOwnProperty('params')) {
        this.#createAside(asideEl, note, newNote.querySelector('.note-text'));
      }
      document.body.appendChild(newNote);
    });
    this.#setupCopyBtns();
  }

  #createNote(note, noteEl) {
    const newNote = this._getNewParent(noteEl);
    this._templateText(newNote, '.note-title', 'title', note.title);
    const noteTextEl = newNote.querySelector('.note-note');
    if (note.hasOwnProperty('params')) {
      this._templateHtml(
        noteTextEl,
        'note',
        this.#insertParams(note.note.join('\n<br>') + '\n', note.params)
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
    const markEl = this._getParentElement('template-note-mark', 'mark');
    const result = [];
    params.forEach((param, i) => {
      const newMark = this._getNewParent(markEl);
      newMark.classList.add(`mark-${j}`);
      this._templateElText(newMark, 'text', param?.name);
      j++;
      if (i > 0 && i % 6 === 0) j = 1;
      result.push(newMark.outerHTML);
    });
    return result;
  }

  #createAside(asideEl, note, textEl) {
    const newAside = this._getNewParent(asideEl);
    const parentEl = newAside.querySelector('p');
    const markEl = this._getParentElement('template-note-mark', 'mark');
    let j = 1;
    note.params.forEach((param, i) => {
      const newMark = this._getNewParent(markEl);
      newMark.classList.add(`mark-${j}`);
      j++;
      if (i > 0 && i % 6 === 0) j = 1;
      this._templateElText(newMark, 'text', param?.desc + '\n');
      parentEl.appendChild(newMark);
      parentEl.appendChild(this._createBr());
    });
    textEl.appendChild(newAside);
  }

  #setupCopyBtns() {
    const noteTexts = document.querySelectorAll('.note-text');
    const noteCopies = document.querySelectorAll('.note-copy');
    noteCopies.forEach((copyText, i) => {
      const noteText = noteTexts[i];
      copyText.addEventListener('click', () => {
        this.#copyText(noteText);
      });
    });
  }

  #copyText(noteText) {
    const title = noteText.querySelector('.note-title');
    const text = noteText.querySelector('.note-note');
    const aside = noteText.querySelector('aside');
    let asideTxt;
    if (aside) asideTxt = aside.querySelector('p').textContent;
    const txt = asideTxt
      ? `${title.textContent}${text.textContent}aside:\n${asideTxt}`
      : `${title.textContent}${text.textContent}`;
    navigator.clipboard.writeText(txt);
  }
}

export default new NoteView();
