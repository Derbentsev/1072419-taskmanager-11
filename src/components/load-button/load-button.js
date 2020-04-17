import {createElement} from '../../utils.js';
import {createLoadButtonTemplate} from './load-button-tpl.js';


class LoadButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createLoadButtonTemplate();
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
  LoadButton
};
