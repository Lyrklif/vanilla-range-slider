import VanillaRangeSlider from '../plugin';
import type { TSliderProps } from '../plugin';
import { modeStrict, modeFree } from '../plugin';

const initDemoVariants = () => {
  const params1: TSliderProps = {
    min: -40,
    max: 60,
    step: 1,
    range: true,
    fill: true,
    thumb: true,
    mode: modeFree,
    // scale: true,
  };
  const params2: TSliderProps = {
    min: 0,
    max: 100,
    step: 1,
    vertical: true,
    range: true,
    fill: true,
    thumb: true,
    mode: modeFree,
    // scale: true,
  };

  const elem1 = document.getElementById('horizontal-slider');
  const elem2 = document.getElementById('horizontal-slider2');
  const elem3 = document.getElementById('vertical-slider');
  const elem4 = document.getElementById('vertical-slider2');

  if (elem1) {
    new VanillaRangeSlider(elem1, { ...params1, mode: modeStrict });
  }
  if (elem2) {
    new VanillaRangeSlider(elem2, { ...params1, invert: true, invertThumb: true });
  }
  if (elem3) {
    new VanillaRangeSlider(elem3, { ...params2, mode: modeStrict });
  }
  if (elem4) {
    new VanillaRangeSlider(elem4, { ...params2, invert: true, invertThumb: true });
  }
};

window.addEventListener('load', () => {
  initDemoVariants();
});
