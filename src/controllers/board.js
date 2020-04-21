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
  SHOWING_TASKS_COUNT_ON_START,
  SHOWING_TASKS_COUNT_BY_BUTTON
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

class BoardController {
  constructor(container) {
    this._container = container;

    this._noTasksComponent = new NoTask();
    this._sortComponent = new Sort();
    this._tasksComponent = new Tasks();
    this._loadButtonComponent = new LoadButton();
  }

  render(tasks) {
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
    tasks.slice(0, showingTasksCount)
      .forEach((task) => {
        renderTask(taskListElement, task);
      });

    render(container, this._loadButtonComponent, RenderPosition.BEFOREEND);

    this._loadButtonComponent.setClickHandler(() => {
      const prevTasksCount = showingTasksCount;
      showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      tasks.slice(prevTasksCount, showingTasksCount)
        .forEach((task) => renderTask(taskListElement, task));

      if (showingTasksCount >= tasks.length) {
        remove(this._loadButtonComponent);
      }
    });
  }
}


export {
  BoardController
};
