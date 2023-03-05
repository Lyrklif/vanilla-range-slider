import './shared/styles/slider.scss';
import './demo/demo.scss';
import initSlider from './plugin/index';
// import initSettings from './demo/index';

window.addEventListener('load', () => {
  const params1 = {
    min: -40,
    max: 60,
    step: 1,
    range: true,
    fill: true,
  };
  const params2 = {
    min: 0,
    max: 100,
    step: 1,
    vertical: true,
    range: true,
    fill: true,
  };

  initSlider('#horizontal-slider', params1);
  initSlider('#horizontal-slider2', { ...params1, invert: true });
  initSlider('#vertical-slider', params2);
  initSlider('#vertical-slider2', { ...params2, invert: true });
  // initSettings('#slider-settings');
});
