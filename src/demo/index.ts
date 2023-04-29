import HorizontalSlider from './children/horizontal-slider';
import HorizontalSlider2 from './children/horizontal-slider2';
import VerticalSlider from './children/vertical-slider';
import VerticalSlider2 from './children/vertical-slider2';

const initDemoVariants = () => {
  HorizontalSlider();
  HorizontalSlider2();
  VerticalSlider();
  VerticalSlider2();
};

window.addEventListener('load', () => {
  initDemoVariants();
});
