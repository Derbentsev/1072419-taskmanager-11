import {createTaskTemplate} from './task-board-tpl';
import {AbstractComponent} from '../abstract-component';


export class Tasks extends AbstractComponent {
  getTemplate() {
    return createTaskTemplate();
  }
}
