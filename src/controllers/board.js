import {
  Sort
} from '../components/sort/sort';
import {
  Task
} from '../components/task/task';
import {
  Tasks
} from '../components/task-board/task-board';
import {
  LoadButton
} from '../components/load-button/load-button';
import {
  TaskEdit
} from '../components/task-edit/task-edit';
import {
  NoTask
} from '../components/no-task/no-task';
import {
  render,
  replace,
  remove,
} from '../utils/render';
import {
  RenderPosition,
  SortType,
  SHOWING_TASKS_COUNT_ON_START,
  SHOWING_TASKS_COUNT_BY_BUTTON,
} from '../consts';


const renderTask = (taskListElement, task) => {
  const onEditButtonClick = () => {
    replace(taskEditComponent, taskComponent);
    document.addEventListener(`keydown`, onEscKeydown);
  };

  const closeEditForm = () => {
    replace(taskComponent, taskEditComponent);
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
  taskComponent.setEditButtonClickHandler(onEditButtonClick);

  const taskEditComponent = new TaskEdit(task);
  taskEditComponent.setSubmitHandler(onEditFormSubmit);

  render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
};

const renderTasks = ((taskListElement, tasks) => {
  tasks.forEach((task) => {
    renderTask(taskListElement, task);
  });
});

const getSortedTasks = (tasks, sortType, from, to) => {
  let sortedTasks = [];
  const showingTasks = tasks.slice();

  switch (sortType) {
    case SortType.DATE_UP:
      sortedTasks = showingTasks.sort((a, b) => a.dueDate - b.dueDate);
      break;
    case SortType.DATE_DOWN:
      sortedTasks = showingTasks.sort((a, b) => b.dueDate - a.dueDate);
      break;
    case SortType.DEFAULT:
      sortedTasks = showingTasks;
      break;
  }

  return sortedTasks.slice(from, to);
};

export class BoardController {
  constructor(container) {
    this._container = container;

    this._noTasksComponent = new NoTask();
    this._sortComponent = new Sort();
    this._tasksComponent = new Tasks();
    this._loadButtonComponent = new LoadButton();
  }

  render(tasks) {
    const renderLoadButton = () => {
      if (showingTasksCount >= tasks.length) {
        return;
      }

      render(container, this._loadButtonComponent, RenderPosition.BEFOREEND);

      this._loadButtonComponent.setClickHandler(() => {
        const prevTasksCount = showingTasksCount;
        showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

        const sortedTasks = getSortedTasks(tasks, this._sortComponent.getSortType(),
            prevTasksCount, showingTasksCount);

        renderTasks(taskListElement, sortedTasks);

        if (showingTasksCount >= tasks.length) {
          remove(this._loadButtonComponent);
        }
      });
    };

    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._tasksComponent, RenderPosition.BEFOREEND);

    const taskListElement = this._tasksComponent.getElement();

    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    renderTasks(taskListElement, tasks.slice(0, showingTasksCount));
    renderLoadButton();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      showingTasksCount = SHOWING_TASKS_COUNT_BY_BUTTON;

      const sortedTasks = getSortedTasks(tasks, sortType, 0, showingTasksCount);

      taskListElement.innerHTML = ``;

      renderTasks(taskListElement, sortedTasks);
      renderLoadButton();
    });
  }
}
