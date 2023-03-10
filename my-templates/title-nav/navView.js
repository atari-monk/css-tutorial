import { DetectOsCard } from "./detect-os-card/script.js"

export class NavView {

  addHandlerRender(handler) {
    ["load"].forEach((ev) => window.addEventListener(ev, handler));
  }

  createContent(data) {
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

    const osCard = new DetectOsCard();
    const osCardEl = osCard.createContent();
    const navNav = newNav.querySelector("#nav-nav");
    navNav.appendChild(osCardEl);
    document.body.appendChild(newNav);
  }
}

export default new NavView();