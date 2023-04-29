import VanillaRangeSlider from '../../plugin';
import type { TSliderProps } from '../../plugin';
import { modeFree } from '../../plugin';

const init = () => {
  const params2: TSliderProps = {
    min: 0,
    max: 100,
    step: 1,
    vertical: true,
    range: true,
    fill: true,
    thumb: true,
    mode: modeFree,
    invert: true,
    invertThumb: true,
    // scale: true,
  };

  const elem4 = document.getElementById('vertical-slider2');
  return elem4 && new VanillaRangeSlider(elem4, params2);
};

export default init;
