import {
  SiteMenu
} from './components/site-menu/site-menu';
import {
  Filter
} from './components/filter/filter';
import {
  Board
} from './components/board/board';
import {
  generateFilters
} from './mocks/filter';
import {
  generateTasks
} from './mocks/task';
import {
  render,
} from './utils/render';
import {
  RenderPosition,
  TASK_COUNT,
} from './consts';
import {
  BoardController
} from './controllers/board';
import {
  TasksModel
} from './models/tasks';


const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const tasks = generateTasks(TASK_COUNT);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);
const filters = generateFilters();

render(siteHeaderElement, new SiteMenu(), RenderPosition.BEFOREEND);
render(siteMainElement, new Filter(filters), RenderPosition.BEFOREEND);

const boardComponent = new Board();
const boardController = new BoardController(boardComponent, tasksModel);

render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);
boardController.render(tasks);
