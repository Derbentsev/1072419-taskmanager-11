export class Tasks {
  constructor() {
    this._tasks = [];

    this._dataChangeHandler = [];
  }

  getTasks() {
    return this._tasks;
  }

  setTask(tasks) {
    this._tasks = Array.from(tasks);
    this._callHandler(this._dataChangeHandler);
  }

  updateTask(id, task) {
    const index = this._tasks.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._tasks = [].concat(this._tasks.slice(0, index), task, this._tasks.slice(index + 1));

    this._callHandler(this._dataChangeHandler);

    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandler.push(handler);
  }

  _callHandler(handlers) {
    handlers.forEach((handler) => handler());
  }
}
