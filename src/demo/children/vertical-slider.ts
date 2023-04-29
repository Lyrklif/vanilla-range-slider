import VanillaRangeSlider from '../../plugin';
import type { TSliderProps } from '../../plugin';
import { modeStrict } from '../../plugin';

const init = () => {
  const params: TSliderProps = {
    min: 0,
    max: 100,
    step: 1,
    vertical: true,
    range: true,
    fill: true,
    thumb: true,
    mode: modeStrict,
    // scale: true,
  };

  const elem = document.getElementById('vertical-slider');
  return elem && new VanillaRangeSlider(elem, params);
};

export default init;
