import {SortType} from '../../consts';


/**
 * Создаем разметку блока Сортировка
 * @return {string} Разметка
 */
const createSortTemplate = () => {
  return (
    `<section class="board container">
      <div class="board__filter-list">
        <a href="#" data-sort-type="${SortType.DEFAULT}" class="board__filter">SORT BY DEFAULT</a>
        <a href="#" data-sort-type="${SortType.DATE_UP}" class="board__filter">SORT BY DATE up</a>
        <a href="#" data-sort-type="${SortType.DATE_DOWN}" class="board__filter">SORT BY DATE down</a>
      </div>
    </section>`
  );
};


export {
  createSortTemplate
};
