import VanillaRangeSlider from '../../plugin';
import type { TSliderProps } from '../../plugin';
import { modeStrict } from '../../plugin';

const init = () => {
  const params: TSliderProps = {
    min: -40,
    max: 60,
    step: 1,
    range: true,
    fill: true,
    thumb: true,
    mode: modeStrict,
    // scale: true,
  };

  const elem1 = document.getElementById('horizontal-slider');
  return elem1 && new VanillaRangeSlider(elem1, params);
};

export default init;
