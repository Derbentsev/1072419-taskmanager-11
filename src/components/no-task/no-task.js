import {
  createNoTaskTemplate
} from './no-task-tpl.js';
import {
  createElement
} from '../../utils.js';


class NoTask {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoTaskTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}


export {
  NoTask
};
