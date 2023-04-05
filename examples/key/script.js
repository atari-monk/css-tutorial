(function () {
  const p = btoa('atari');
  console.log(p);

  const o = document.getElementById('protect-overlay');
  o.getElementsByTagName('form')[0].onsubmit = function () {
    if (this.answer.value === atob('YXRhcmk=')) {
      o.style.display = 'none';
    } else {
      alert('Wrong password!');
    }
    return false;
  };
})();
