const TASK_COUNT = 3;

import {createSiteMenuTemplate} from './components/menu.js';
import {createFilterTemplate} from './components/filter.js';
import {createSortTemplate} from './components/sort.js';
import {createFormTemplate} from './components/form.js';
import {createCardTemplate} from './components/card.js';
import {createLoadButtonTemplate} from './components/loadButton.js';
import {render} from './components/rendering.js';


const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createFilterTemplate(), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
const boardElement = siteMainElement.querySelector(`.board`);

render(taskListElement, createFormTemplate(), `beforeend`);

for (let i = 0; i < TASK_COUNT; i++) {
  render(taskListElement, createCardTemplate(), `beforeend`);
}

render(boardElement, createLoadButtonTemplate(), `beforeend`);
