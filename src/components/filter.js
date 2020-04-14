import {createElement} from "../utils.js";

/**
 * Создаем разметку отдельного фильтра
 * @param {object} filter - Фильтр
 * @param {boolean} isChecked - Отметка, готова ли задача
 * @return {string}
 */
const createFilterMarkup = (filter, isChecked) => {
  const {name, count} = filter;

  return (
    `<input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? `checked` : ``}
    />
    <label for="filter__${name}" class="filter__label">
      ${name} <span class="filter__${name}-count">${count}</span></label
    >`
  );
};

/**
 * Создаем разметку блока Фильтры
 * @param {object} filters - Массив фильтров
 * @return {string}
 */
const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);

  return (
    `<section class="main__filter filter container">
    ${filtersMarkup}
    </section>`
  );
};

class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


export {
  Filter
};
