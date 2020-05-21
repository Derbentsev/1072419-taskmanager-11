import {Board} from './components/board/board';
import {render} from './utils/render';
import {BoardController} from './controllers/board';
import {FilterController} from './controllers/filter';
import {Statistics} from './components/statistics';
import {Tasks} from './models/tasks';
import {API} from './api/index';
import Store from './api/store';
import {Provider} from './api/provider';
import {
  SiteMenu,
  MenuItem,
} from './components/site-menu/site-menu';
import {
  RenderPosition,
  AUTHORIZATION,
  END_POINT,
  STORE_NAME,
} from './consts';


const dateTo = new Date();
const dateFrom = (() => {
  const d = new Date(dateTo);
  d.setDate(d.getDate() - 7);
  return d;
})();

const api = new API(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const tasksModel = new Tasks();

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const siteMenuComponent = new SiteMenu();
const statisticsComponent = new Statistics({tasks: tasksModel, dateFrom, dateTo});

const boardComponent = new Board();
const boardController = new BoardController(boardComponent, tasksModel, apiWithProvider);
const filterController = new FilterController(siteMainElement, tasksModel);

render(siteHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);
filterController.render();
render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);
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

apiWithProvider.getTasks()
  .then((tasks) => {
    tasksModel.setTasks(tasks);
    boardController.render();
  });
