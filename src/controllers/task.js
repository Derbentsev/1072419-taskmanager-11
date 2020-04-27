import {
  Task
} from '../components/task/task';
import {
  TaskEdit
} from '../components/task-edit/task-edit';
import {
  render,
  replace,
} from '../utils/render';
import {
  RenderPosition,
} from '../consts';


const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};


export class TaskController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._taskComponent = null;
    this._taskEditComponent = null;
  }

  render(task) {
    const oldTaskComponent = this._taskComponent;
    const oldTaskEditComponent = this._taskEditComponent;

    this._taskComponent = new Task(task);
    this._taskEditComponent = new TaskEdit(task);

    const onEditButtonClick = () => {
      this._replaceTaskToEdit();
      document.addEventListener(`keydown`, onEscKeydown);
    };

    const onEditFormSubmit = (evt) => {
      evt.preventDefault();
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeydown);
    };

    const onEscKeydown = (evt) => {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        this._replaceEditToTask();
      }
    };

    this._taskComponent.setArchiveButtonClickHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isArchive: !task.isArchive,
      }));
    });

    this._taskComponent.setFavoritesButtonCLickHandler(() => {
      this.onDataChange(this, task, Object.assign({}, task, {
        isFavorite: !task.isFavorite,
      }));
    });

    this._taskComponent.setEditButtonClickHandler(onEditButtonClick);
    this._taskEditComponent.setSubmitHandler(onEditFormSubmit);

    if (oldTaskComponent && oldTaskEditComponent) {
      replace(this._taskComponent, oldTaskComponent);
      replace(this._taskEditComponent, oldTaskEditComponent);
    } else {
      render(this._container, this._taskComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToTask();
    }
  }

  _replaceEditToTask() {
    this._taskEditComponent.reset();
    replace(this._taskComponent, this._taskEditComponent);
    this._mode = Mode.DEFAULT;
  }

  _replaceTaskToEdit() {
    this._onViewChange();
    replace(this._taskEditComponent, this._taskComponent);
    this._mode = Mode.EDIT;
  }
}