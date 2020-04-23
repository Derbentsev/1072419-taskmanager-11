import {createBoardTemplate} from './board-tpl';
import {AbstractComponent} from '../abstract-component';


export class Board extends AbstractComponent {
  getTemplate() {
    return createBoardTemplate();
  }
}
