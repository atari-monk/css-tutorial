import { DEBUG } from "./../config.js";

export class DetectOsCard {
  #system;
  #currentSystem;
  #cardImg;
  #cardh4;

  constructor() {
    this.#system = {
      Unknown: 'Unknown',
      Android: 'Android',
      Windows: 'Windows'
    };
    this.#setSystemEnum();
  }

  #setSystemEnum() {
    const osName = this.#getSystem().toLowerCase();
    DEBUG && console.log(`OS: ${osName}`);
    switch (osName) {
      case "windows":
        this.#currentSystem = this.#system.Windows;
        break;
      case "android":
        this.#currentSystem = this.#system.Android;
        break;
      default:
        this.#currentSystem = this.#system.Unknown;
        break;
    }
  }

  #setUnknown() {
    this.#cardImg.classList.remove();
    this.#cardImg.classList.add("card-img-unknown");
    this.#cardImg.setAttribute("src", "./detect-os-card/unknown.png");
    this.#cardh4.textContent = "SYSTEM";
  }

  #setAndroid() {
    this.#cardImg.classList.remove();
    this.#cardImg.classList.add("card-img-android");
    this.#cardImg.setAttribute("src", "./detect-os-card/android.png");
    this.#cardh4.textContent = this.#currentSystem.toString();
  }

  #setWindows() {
    this.#cardImg.classList.remove();
    this.#cardImg.classList.add("card-img-windows");
    this.#cardImg.setAttribute("src", "./detect-os-card/windows.png");
    this.#cardh4.textContent = this.#currentSystem.toString();
  }

  #getSystem() {
    const uap = new UAParser();
    const os = uap.getOS();
    return os.name;
  }

  createContent() {
    const detectOsTemplate = document.getElementById("template-detect-os");
    const card = detectOsTemplate.content.querySelector(".card");
    let newCard;
    newCard = document.importNode(card, true);
    this.#cardImg = newCard.querySelector("#card-img");
    this.#cardh4 = newCard.querySelector(".card-h4");
    switch (this.#currentSystem) {
      case this.#system.Unknown:
        this.#setUnknown();
        break;
      case this.#system.Android:
        this.#setAndroid();
        break;
      case this.#system.Windows:
        this.#setWindows();
        break;
      default:
        this.#setUnknown();
        break;
    }
    return newCard;
  }
}