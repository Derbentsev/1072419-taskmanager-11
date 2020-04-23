import {
  RenderPosition
} from "../consts";


/**
 * Создаем функцию для рендеринга (вставки в DOM) компонентов
 * @param {object} container - Элемент, который вставляем
 * @param {string} component - Вёрстка, которую вставляем
 * @param {string} place - Место в контейнере
 * @return {void}
 */
const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
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

const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElement = !!(parentElement && newElement && oldElement);

  if (isExistElement && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};


export {
  render,
  createElement,
  replace,
  remove
};
