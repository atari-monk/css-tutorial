import model from "./model.js";
import { DEBUG } from "./config.js";

function addHandlerRender(handler) {
  ["load"].forEach((ev) => window.addEventListener(ev, handler));
}

async function controlIndex() {
  try {
    const data = await model.loadJson('test');
    DEBUG && console.log(data);
    createContent(data);
  } catch (err) {
    DEBUG && console.log(err);
  }
}

function createContent(data) {
  const navTemplate = document.getElementById("template-nav");
  const nav = navTemplate.content.querySelector(".nav");
  let newNav;
  newNav = document.importNode(nav, true);
  const titleEl = newNav.querySelector(".nav-title");
  titleEl.textContent = titleEl.textContent.replace(/{%TITLE%}/g, `${data.title}`);

  const navItemTemplate = document.getElementById("template-nav-item");
  const navItem = navItemTemplate.content.querySelector(".nav-item");
  const navItemsEl = newNav.querySelector(".nav-ul");

  data.nav.forEach(navData => {
    let newNavItem;
    newNavItem = document.importNode(navItem, true);
    const navEl = newNavItem.querySelector(".nav-item-link");
    navEl.textContent = navEl.textContent
      .replace(/{%NAV_LINK%}/g, `${navData.title}`);
    navEl.setAttribute("href", `#${navData.title.toLowerCase()}`);
    navItemsEl.appendChild(newNavItem);
  });
  document.body.appendChild(newNav);
}

addHandlerRender(controlIndex);