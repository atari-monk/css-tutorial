let noteTexts = document.querySelectorAll('.note-text');
let noteCopies = document.querySelectorAll('.note-copy');

let i = 0;
noteCopies.forEach(copyText => {
  let noteText = noteTexts[i];
  copyText.addEventListener('click', () => {
    let title = noteText.querySelector('.note-title');
    let text = noteText.querySelector('.note-note');
    var txt = `${title.textContent}
    ${text.textContent}
    `;
    navigator.clipboard.writeText(txt);
  });
  i++;
});
