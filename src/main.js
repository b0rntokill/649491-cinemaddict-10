import HeaderProfileComponent from './components/header/profile.js';
import MainNavigateComponent from './components/main/navigation.js';
import MainFilmsComponent from './components/main/films/films-main.js';
import FooterStatisticsComponent from './components/footer/statistics.js';
import PageController from './controllers/page-controller.js';
import {render, RenderPosition} from './utils/render.js';
import {cards} from './mock/mock.js';

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

render(header, new HeaderProfileComponent(cards), RenderPosition.BEFOREEND);
render(main, new MainNavigateComponent(cards), RenderPosition.BEFOREEND);
const mainFilmsComponent = new MainFilmsComponent(cards);
render(main, mainFilmsComponent, RenderPosition.BEFOREEND);
const pageController = new PageController(mainFilmsComponent);
pageController.render(cards);

render(footer, new FooterStatisticsComponent(cards), RenderPosition.BEFOREEND);
