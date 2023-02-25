import './shared/styles/slider.scss';
import './demo/demo.scss';
import initSlider from './plugin/index';
import initSettings from './demo/index';

window.addEventListener('load', () => {
  initSlider('#slider');
  initSettings('#slider-settings');
});
