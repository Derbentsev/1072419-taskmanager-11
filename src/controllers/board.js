import {
  Sort
} from '../components/sort/sort';
import {
  TaskController
} from '../controllers/task';
import {
  Tasks
} from '../components/task-board/task-board';
import {
  LoadButton
} from '../components/load-button/load-button';
import {
  NoTask
} from '../components/no-task/no-task';
import {
  render,
  remove,
} from '../utils/render';
import {
  RenderPosition,
  SHOWING_TASKS_COUNT_ON_START,
  SHOWING_TASKS_COUNT_BY_BUTTON,
  SortType,
} from '../consts';


const renderTasks = ((taskListElement, tasks, onDataChange, onViewChange) => {
  return tasks.map((task) => {
    const taskController = new TaskController(taskListElement, onDataChange, onViewChange);

    taskController.render(task);

    return taskController;
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
  constructor(container, tasksModel) {
    this._container = container;
    this._tasksModel = tasksModel;

    this._showedTasksControllers = [];
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    this._noTasksComponent = new NoTask();
    this._sortComponent = new Sort();
    this._tasksComponent = new Tasks();
    this._loadButtonComponent = new LoadButton();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onLoadButtonClick = this._onLoadButtonClick.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._taskModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const container = this._container.getElement();
    const tasks = this._tasksModel;
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._tasksComponent, RenderPosition.BEFOREEND);

    const taskListElement = this._tasksComponent.getElement();

    const newTasks = renderTasks(taskListElement, tasks, this._onDataChange, this._onViewChange);
    this._showedTasksControllers = this._showedTasksControllers.concat(newTasks);

    this._showingTasksCount = this._showedTasksControllers.length;
  }

  _removeTasks() {
    this._showedTasksControllers.forEach((taskController) => taskController.destroy());
    this._showedTasksControllers = [];
  }

  _updateTasks(count) {
    this._removeTasks();
    this._renderTasks(this._taskModel.getTasks().slice(0, count));
    this._renderLoadButton();
  }

  _renderLoadButton() {
    remove(this._loadButtonComponent);

    if (this._showingTasksCount >= this._tasksModel.getTasks().length) {
      return;
    }

    const container = this._container.getElement();
    render(container, this._loadButtonComponent, RenderPosition.BEFOREEND);

    this._loadButtonComponent.setClickHandler(this._onLoadButtonClick);
  }

  _onLoadButtonClick() {
    const prevTasksCount = this._showingTasksCount;
    const tasks = this._tasksModel.getTasks();

    this._showingTasksCount = this._showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    const sortedTasks = getSortedTasks(tasks, this._sortComponent.getSortType(), prevTasksCount, this._showingTasksCount);
    this._renderTasks(sortedTasks);

    if (this._showingTasksCount >= sortedTasks.length) {
      remove(this._loadButtonComponent);
    }
  }

  _onDataChange(taskController, oldData, newData) {
    const isSuccess = this._tasksModel.updateTask(oldData.id, newData);

    if (isSuccess) {
      taskController.render(newData);
    }
  }

  _onViewChange() {
    this._showedTasksControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this.showingTasksCount = SHOWING_TASKS_COUNT_BY_BUTTON;

    const sortedTasks = getSortedTasks(this._tasksModel.getTasks(), sortType, 0, this._showingTasksCount);

    this._removeTasks();
    this._renderTasks(sortedTasks);
  }

  _onFilterChange() {
    this._updateTasks(SHOWING_TASKS_COUNT_ON_START);
  }
}
