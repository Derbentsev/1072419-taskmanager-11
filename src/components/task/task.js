import {
  createTaskTemplate
} from './task-tpl.js';
import {
  createElement,
} from '../../utils.js';


/**
 * Класс, представляющий задачу
 */
class Task {
  /**
   * Создаем новую задачу
   * @param {object} task - Задача
   */
  constructor(task) {
    this._task = task;
    this._element = null;
  }

  /**
   * Создаём вёрстку задачи
   * @return {string} Вёрстка задачи
   */
  getTemplate() {
    return createTaskTemplate(this._task);
  }

  /**
   * Возвращаем вёрстку задачи
   * @return {string} Вёрстка задачи
   */
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  /**
   * Удаляем вёрстку задачи
   */
  removeElement() {
    this._element = null;
  }
}


export {
  Task
};
