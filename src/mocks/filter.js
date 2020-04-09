const filterNames = [
  `all`, `overdue`, `today`, `favourites`, `repeating`, `archive`
];

/**
 * Генерируем фильтры
 * @return {array} Массив фильров
 */
const generateFilters = () => {
  return filterNames.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * 10),
    };
  });
};


export {generateFilters};
