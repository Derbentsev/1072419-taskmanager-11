import {
  createSiteMenuTemplate
} from './components/menu.js';
import {
  createFilterTemplate
} from './components/filter.js';
import {
  createSortTemplate
} from './components/sort.js';
import {
  createTaskTemplate
} from './components/task.js';
import {
  createLoadButtonTemplate
} from './components/loadButton.js';
import {
  generateFilters
} from './mocks/filter.js';
import {
  generateTasks
} from './mocks/task.js';
import {
  render
} from './components/rendering.js';
import {
  createTaskEditTemplate
} from './components/taskEdit.js';


const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createFilterTemplate(filters), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
const boardElement = siteMainElement.querySelector(`.board`);

render(taskListElement, createTaskEditTemplate(tasks[0]), `beforeend`);

tasks.slice(1, SHOWING_TASKS_COUNT_ON_START)
  .forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));

render(boardElement, createLoadButtonTemplate(), `beforeend`);

const loadMoreButton = boardElement.querySelector(`.load-more`);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount)
    .forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
