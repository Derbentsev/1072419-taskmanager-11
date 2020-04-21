import {createTaskEditTemplate} from './task-edit-tpl';
import {AbstractComponent} from '../abstract-component';


export class TaskEdit extends AbstractComponent {
  constructor(task) {
    super();

    this._task = task;
  }

  getTemplate() {
    return createTaskEditTemplate(this._task);
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`)
      .addEventListener(`submit`, handler);
  }
}
