
export class NavView {

  addHandlerRender(handler) {
    ["load"].forEach((ev) => window.addEventListener(ev, handler));
  }

  createContent(data, detectOSCard) {
    const nav = this.#createNav(data);
    this.#createNavLinks(nav, data);
    this.#createDetectOsCard(nav, detectOSCard);
    document.body.appendChild(nav);
  }

  #createNav(data) {
    const template = document.getElementById("template-nav");
    const nav = template.content.querySelector(".nav");
    let newNav;
    newNav = document.importNode(nav, true);
    const titleEl = newNav.querySelector(".nav-title");
    titleEl.textContent = titleEl.textContent.replace(/{%TITLE%}/g, `${data.title}`);
    return newNav;
  }

  #createNavLinks(nav, data) {
    const navItems = nav.querySelector(".nav-ul");
    const template = document.getElementById("template-nav-item");
    const navItem = template.content.querySelector(".nav-item");

    data.nav.forEach(navData => {
      let newNavItem;
      newNavItem = document.importNode(navItem, true);
      const navItemLink = newNavItem.querySelector(".nav-item-link");
      navItemLink.textContent = navItemLink.textContent
        .replace(/{%NAV_LINK%}/g, `${navData.title}`);
      navItemLink.setAttribute("href", `#${navData.title.toLowerCase()}`);
      navItems.appendChild(newNavItem);
    });
  }

  #createDetectOsCard(nav, detectOSCard) {
    const navNav = nav.querySelector("#nav-nav");
    navNav.appendChild(detectOSCard);
  }
}

export default new NavView();