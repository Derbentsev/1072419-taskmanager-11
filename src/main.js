import {
  SiteMenu,
  MenuItem,
} from './components/site-menu/site-menu';
import {
  Board
} from './components/board/board';
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
  FilterController
} from './controllers/filter';
import {
  Statistics
} from './components/statistics';
import {
  Tasks
} from './models/tasks';


const dateTo = new Date();
const dateFrom = (() => {
  const d = new Date(dateTo);
  d.setDate(d.getDate() - 7);
  return d;
})();

const tasks = generateTasks(TASK_COUNT);
const tasksModel = new Tasks();
tasksModel.setTasks(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const siteMenuComponent = new SiteMenu();
const statisticsComponent = new Statistics({tasks: tasksModel, dateFrom, dateTo});
const boardComponent = new Board();
const boardController = new BoardController(boardComponent, tasksModel);
const filterController = new FilterController(siteMainElement, tasksModel);

render(siteHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);
filterController.render();
render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);
boardController.render();

render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hide();

siteMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      siteMenuComponent.setActiveItem(menuItem.TASKS);
      statisticsComponent.hide();
      boardController.show();
      boardController.createTask();
      break;
    case MenuItem.STATISTICS:
      boardController.hide();
      statisticsComponent.show();
      break;
    case MenuItem.TASKS:
      statisticsComponent.hide();
      boardController.show();
      break;
  }
});
