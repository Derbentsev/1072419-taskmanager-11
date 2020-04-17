import {createElement} from '../../utils.js';
import {createTaskTemplate} from './task-board-tpl.js';


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
