import VanillaRangeSlider from '../../plugin';
import type { TSliderProps } from '../../plugin';
import { modeFree } from '../../plugin';

const init = () => {
  const params: TSliderProps = {
    min: -40,
    max: 60,
    step: 1,
    range: true,
    fill: true,
    thumb: true,
    mode: modeFree,
    invert: true,
    invertThumb: true,
    // scale: true,
  };

  const elem = document.getElementById('horizontal-slider2');
  return elem && new VanillaRangeSlider(elem, params);
};

export default init;
