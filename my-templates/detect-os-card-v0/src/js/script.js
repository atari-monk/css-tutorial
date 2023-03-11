const card = document.querySelector(".card");
const cardImg = document.getElementById("card-img");
const cardh4 = document.querySelector(".card-h4");
const system = getSystem();

function setUnknown() {
  cardImg.classList.remove();
  cardImg.classList.add("card-img-unknown");
  cardImg.setAttribute("src", "./src/img/unknown.png");
  cardh4.textContent = "SYSTEM";
}

function setAndroid() {
  cardImg.classList.remove();
  cardImg.classList.add("card-img-android");
  cardImg.setAttribute("src", "./src/img/android.png");
  cardh4.textContent = system.toUpperCase();
}

function setWindows() {
  cardImg.classList.remove();
  cardImg.classList.add("card-img-windows");
  cardImg.setAttribute("src", "./src/img/windows.png");
  cardh4.textContent = system.toUpperCase();
}

const System = Object.freeze({
  Unknown: Symbol("Unknown"),
  Android: Symbol("Android"),
  Windows: Symbol("Windows")
})

let currentSys = System.Windows;

switch (currentSys) {
  case System.Unknown:
    setUnknown();
    break;
  case System.Android:
    setAndroid();
    break;
  case System.Windows:
    setWindows();
    break;
  default:
    setUnknown();
    break;
}

function getSystem() {
  const uap = new UAParser();
  const os = uap.getOS();
  return os.name;
}