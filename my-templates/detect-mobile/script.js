var uap = new UAParser();
const os = uap.getOS();
const pEl = document.getElementById('os');
pEl.textContent = os.name;
console.log(os);