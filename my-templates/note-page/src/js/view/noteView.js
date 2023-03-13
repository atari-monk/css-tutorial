
export class NoteView {

  createContent(data) {
    const notes = data.filter(note => note.type === 'note');
    const noteTemplate = document.getElementById("template-note");
    const noteEl = noteTemplate.content.querySelector(".note");
    let newNote, i;
    notes.forEach(note => {
      newNote = document.importNode(noteEl, true);
      const titleEl = newNote.querySelector(".note-title");
      titleEl.textContent = titleEl.textContent.replace(/{%TITLE%}/g, `${note.title}\n`);
      const noteTextEl = newNote.querySelector(".note-note");
      noteTextEl.innerHTML = noteTextEl.textContent.replace(/{%NOTE%}/g, note.note.join('\n<br>'));
      document.body.appendChild(newNote);
    });
  }
}

export default new NoteView();