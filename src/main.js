import {
  SiteMenu
} from './components/site-menu.js';
import {
  Filter
} from './components/filter.js';
import {
  Sort
} from './components/sort.js';
import {
  Task
} from './components/task.js';
import {
  LoadButton
} from './components/loadButton.js';
import {
  TaskEdit
} from './components/taskEdit.js';
import {
  Board
} from './components/board.js';
import {
  generateFilters
} from './mocks/filter.js';
import {
  generateTasks
} from './mocks/task.js';
import {
  render,
} from './utils.js';
import {
  RenderPosition
} from './const.js';


const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;


const renderTask = (taskListElement, task) => {
  const onEditButtonClick = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const taskComponent = new Task(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, onEditButtonClick);

  const taskEditComponent = new TaskEdit(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, onEditFormSubmit);

  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderBoard = () => {};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

render(siteHeaderElement, new SiteMenu().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new Filter(filters).getElement(), RenderPosition.BEFOREEND);

/* const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createFilterTemplate(filters), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

const taskBoard = siteMainElement.querySelector(`.board container`);
render(taskBoard, createSortTemplate(), `afterbegin`);

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
}); */
