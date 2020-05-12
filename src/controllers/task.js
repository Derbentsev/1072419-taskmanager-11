import {
  Task
} from '../components/task/task';
import {
  TaskModel
} from '../models/task';
import {
  TaskEdit
} from '../components/task-edit/task-edit';
import {
  render,
  replace,
  remove,
} from '../utils/render';
import {
  RenderPosition,
  Color,
  Days,
} from '../consts';


export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const EmptyTask = {
  description: ``,
  dueDate: null,
  repeatingDays: {
    "mo": false,
    "tu": false,
    "we": false,
    "th": false,
    "fr": false,
    "sa": false,
    "su": false,
  },
  color: Color.BLACK,
  isFavorite: false,
  isArchive: false,
};

const parseFormData = (formData) => {
  const date = formData.get(`date`);
  const repeatingDays = Days.reduce((acc, day) => {
    acc[day] = false;
    return acc;
  }, {});

  return new TaskModel({
    'description': formData.get(`text`),
    'due_date': date ? new Date(date) : null,
    'repeating_days': formData.getAll(`repeat`).reduce((acc, it) => {
      acc[it] = true;
      return acc;
    }, repeatingDays),
    'color': formData.get(`color`),
    'is_favorite': false,
    'is_done': false,
  });
};

export class TaskController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._taskComponent = null;
    this._taskEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(task, mode) {
    const oldTaskComponent = this._taskComponent;
    const oldTaskEditComponent = this._taskEditComponent;
    this._mode = mode;

    this._taskComponent = new Task(task);
    this._taskEditComponent = new TaskEdit(task);

    const onEditButtonClick = () => {
      this._replaceTaskToEdit();
      document.addEventListener(`keydown`, onEscKeydown);
    };

    const onEditFormSubmit = (evt) => {
      evt.preventDefault();

      const formData = this._taskEditComponent.getData();
      const data = parseFormData(formData);

      this._onDataChange(this, task, data);
      document.removeEventListener(`keydown`, onEscKeydown);
    };

    const onEscKeydown = (evt) => {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        this._replaceEditToTask();
      }
    };

    this._taskComponent.setArchiveButtonClickHandler(() => {
      const newTask = TaskModel.clone(task);
      newTask.isArchive = !newTask.isArchive;
      this._onDataChange(this, task, newTask);
    });

    this._taskComponent.setFavoritesButtonClickHandler(() => {
      const newTask = TaskModel.clone(task);
      newTask.isFavorite = !newTask.isFavorite;
      this._onDataChange(this, task, newTask);
    });

    this._taskComponent.setEditButtonClickHandler(onEditButtonClick);
    this._taskEditComponent.setSubmitHandler(onEditFormSubmit);
    this._taskEditComponent.setDeleteButtonClickHandler(() => this._onDataChange(this, task, null));

    switch (mode) {
      case Mode.DEFAULT:
        if (oldTaskComponent && oldTaskEditComponent) {
          replace(this._taskComponent, oldTaskComponent);
          replace(this._taskEditComponent, oldTaskEditComponent);
          this._replaceEditToTask();
        } else {
          render(this._container, this._taskComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADDING:
        if (oldTaskComponent && oldTaskEditComponent) {
          remove(oldTaskComponent);
          remove(oldTaskEditComponent);
        }

        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(this._container, this._taskEditComponent, RenderPosition.AFTERBEGIN);
        break;
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToTask();
    }
  }

  destroy() {
    remove(this._taskEditComponent);
    remove(this._taskComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceEditToTask() {
    this._taskEditComponent.reset();
    if (document.contains(this._taskEditComponent.getElement())) {
      replace(this._taskComponent, this._taskEditComponent);
    }
    this._mode = Mode.DEFAULT;
  }

  _replaceTaskToEdit() {
    this._onViewChange();
    replace(this._taskEditComponent, this._taskComponent);
    this._mode = Mode.EDIT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyTask, null);
      }
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
