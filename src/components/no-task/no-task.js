import {
  createNoTaskTemplate
} from './no-task-tpl';
import {AbstractComponent} from '../abstract-component';


export class NoTask extends AbstractComponent {
  getTemplate() {
    return createNoTaskTemplate();
  }
}
