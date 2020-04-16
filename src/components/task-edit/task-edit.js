import {
  createElement
} from '../../utils.js';
import {createTaskEditTemplate} from './task-edit-tpl.js';


class TaskEdit {
  constructor(task) {
    this._task = task;
    this._element = null;
  }

  getTemplate() {
    return createTaskEditTemplate(this._task);
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


export {
  TaskEdit
};
