import {
  createTaskTemplate
} from './task-tpl';
import {AbstractComponent} from '../abstract-component';


/**
 * Класс, представляющий задачу
 */
export class Task extends AbstractComponent {
  constructor(task) {
    super();

    this._task = task;
  }

  getTemplate() {
    return createTaskTemplate(this._task);
  }
}
