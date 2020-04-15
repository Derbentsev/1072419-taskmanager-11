import {createElement} from '../utils.js';


/**
 * Создаем разметку блока Задач
 * @return {string} Разметка
 */
const createTaskTemplate = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};

class Tasks {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTaskTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


export {Tasks};
