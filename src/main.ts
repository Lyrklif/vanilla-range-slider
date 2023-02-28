import './shared/styles/slider.scss';
import './demo/demo.scss';
import initSlider from './plugin/index';
// import initSettings from './demo/index';

window.addEventListener('load', () => {
  const params1 = {
    min: 0,
    max: 100,
    step: 1,
    range: true,
  } 
  const params2 = {
    min: 0,
    max: 100,
    step: 1,
    vertical: true,
    range: true,
  } 

  initSlider('#horizontal-slider', params1);
  initSlider('#vertical-slider', params2);
  // initSettings('#slider-settings');
});
