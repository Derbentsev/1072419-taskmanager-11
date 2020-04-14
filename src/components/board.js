import {createElement} from "../utils";

/**
 * Создаем разметку блока Доски
 * @return {string} Разметка
 */
const createBoardTemplate = () => {
  return (
    `<section class="board container"></section>`
  );
};

class Board {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createBoardTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


export {Board};
