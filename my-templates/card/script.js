const card = document.querySelector(".card");
const cardImg = document.getElementById("card-img");
console.log(cardImg);
const cardh4 = document.querySelector(".card-h4");

function setUnknown() {
  cardImg.classList.remove();
  cardImg.classList.add("card-img-unknown");
  cardImg.setAttribute("src", "unknown.png");
  cardh4.textContent = "SYSTEM";
}

function setAndroid() {
  cardImg.classList.remove();
  cardImg.classList.add("card-img-android");
  cardImg.setAttribute("src", "android.png");
  cardh4.textContent = "ANDROID";
}

function setWindows() {
  cardImg.classList.remove();
  cardImg.classList.add("card-img-windows");
  cardImg.setAttribute("src", "windows.png");
  cardh4.textContent = "WINDOWS";
}

const System = Object.freeze({
  Unknown: Symbol("Unknown"),
  Android: Symbol("Android"),
  Windows: Symbol("Windows")
})

let currentSys = System.Unknown;

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