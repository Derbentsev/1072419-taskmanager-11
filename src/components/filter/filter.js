import {createFilterTemplate} from './filter-tpl';
import {AbstractComponent} from '../abstract-component';


const FILTER_ID_PREFIX = `filter__`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};


export class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }
}
