import { CONNECTION } from "./config.js";

class Model {

  async loadJson(page) {
    return await fetch(`${CONNECTION}${page}.json`)
      .then((res) => res.json());
  }
}

export default new Model();