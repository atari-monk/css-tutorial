const card = document.querySelector(".card");
const cardImg = document.getElementById("card-img");
const cardh4 = document.querySelector(".card-h4");
const system = getSystem();

function getSystem() {
  return new UAParser().getOS().name.toLowerCase();
}

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
  Unknown: "Unknown",
  Android: "Android",
  Windows: "Windows"
})

function getSystemEnum() {
  switch (system) {
    case "windows":
      return System.Windows;
    case "android":
      return System.Android;
    default:
      return System.Unknown;
  }
}

let currentSys = getSystemEnum();

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