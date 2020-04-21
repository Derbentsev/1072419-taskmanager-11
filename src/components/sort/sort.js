import {createSortTemplate} from './sort-tpl';
import {AbstractComponent} from '../abstract-component';


export class Sort extends AbstractComponent {
  getTemplate() {
    return createSortTemplate();
  }
}
