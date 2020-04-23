import {createLoadButtonTemplate} from './load-button-tpl';
import {AbstractComponent} from '../abstract-component';


export class LoadButton extends AbstractComponent {
  getTemplate() {
    return createLoadButtonTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
