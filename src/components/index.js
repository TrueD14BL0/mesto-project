import '../styles/index.css';
import { initPopups } from './modal';
import { initCards } from './card';

(function initSiteElements(){
  initCards();
  initPopups();
})();
