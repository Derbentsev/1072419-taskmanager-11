import {
  RenderPosition
} from "./const";


/**
 * Создаем функцию для рендеринга (вставки в DOM) компонентов
 * @param {object} container - Элемент, который вставляем
 * @param {string} element - Вёрстка, которую вставляем
 * @param {string} place - Место в контейнере
 * @return {void}
 */
const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
  // container.insertAdjacentHTML(place, template);
};

/**
 * Добавляем впереди нули к строке, если число меньше 10
 * @param {string} value - Исходная строка
 * @return {string} Строка с добавленным нулем
 */
const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

/**
 * Преобразовываем время в формате `часы:минуты`
 * @param {string} time - Исходная запись времени
 * @return {string} Время в формате `часы:минуты`
 */
const formatTime = (time) => {
  const hours = castTimeFormat(time.getHours() % 12);
  const minutes = castTimeFormat(time.getMinutes());

  return `${hours}:${minutes}`;
};

/**
 * Создаем пустой элемент div и в него вкладываем вёрстку
 * @param {string} template - Вёрстка
 * @return {string} Вёрстка
 */
const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};


export {
  render,
  formatTime,
  createElement
};
