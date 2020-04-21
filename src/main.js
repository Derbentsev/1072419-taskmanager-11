import {
  SiteMenu
} from './components/site-menu/site-menu';
import {
  Filter
} from './components/filter/filter';
import {
  Sort
} from './components/sort/sort';
import {
  Task
} from './components/task/task';
import {
  Tasks
} from './components/task-board/task-board';
import {
  LoadButton
} from './components/load-button/load-button';
import {
  TaskEdit
} from './components/task-edit/task-edit';
import {
  Board
} from './components/board/board';
import {
  NoTask
} from './components/no-task/no-task';
import {
  generateFilters
} from './mocks/filter';
import {
  generateTasks
} from './mocks/task';
import {
  render,
} from './utils';
import {
  RenderPosition,
  TASK_COUNT,
  SHOWING_TASKS_COUNT_ON_START,
  SHOWING_TASKS_COUNT_BY_BUTTON
} from './consts';


const renderTask = (taskListElement, task) => {
  const onEditButtonClick = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
    document.addEventListener(`keydown`, onEscKeydown);
  };

  const closeEditForm = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    closeEditForm();
    document.removeEventListener(`keydown`, onEscKeydown);
  };

  const onEscKeydown = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closeEditForm();
    }
  };

  const taskComponent = new Task(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, onEditButtonClick);

  const taskEditComponent = new TaskEdit(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, onEditFormSubmit);

  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderBoard = (boardComponent, tasks) => {
  render(boardComponent.getElement(), new Sort().getElement(), RenderPosition.BEFOREEND);
  render(boardComponent.getElement(), new Tasks().getElement(), RenderPosition.BEFOREEND);

  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
  tasks.slice(0, showingTasksCount)
    .forEach((task) => {
      renderTask(taskListElement, task);
    });

  const loadButton = new LoadButton();
  render(boardComponent.getElement(), loadButton.getElement(), RenderPosition.BEFOREEND);

  loadButton.getElement().addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    tasks.slice(prevTasksCount, showingTasksCount)
      .forEach((task) => renderTask(taskListElement, task));

    if (showingTasksCount >= tasks.length) {
      loadButton.getElement().remove();
      loadButton.removeElement();
    }
  });
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = generateFilters();

render(siteHeaderElement, new SiteMenu().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new Filter(filters).getElement(), RenderPosition.BEFOREEND);

const tasks = generateTasks(TASK_COUNT);
if (tasks.length > 0) {
  const boardComponent = new Board();
  render(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);
  renderBoard(boardComponent, tasks);
} else {
  render(siteMainElement, new NoTask().getElement(), RenderPosition.BEFOREEND);
}
