import {createSiteMenuTemplate} from './site-menu-tpl';
import {AbstractComponent} from '../abstract-component';


export class SiteMenu extends AbstractComponent {
  getTemplate() {
    return createSiteMenuTemplate();
  }
}
