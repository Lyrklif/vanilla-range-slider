import Container from './atoms/container/container';
import Line from './atoms/line/line';
import Knob from './atoms/knob/knob';
import Input from './atoms/input/input';

type TViews = {
  container: Container;
  bar: Line;
  from: {
    knob: Knob;
    input: Input;
  };
  to: null | {
    knob: Knob;
    input: Input;
  };
};

type TCoords = {
  x: number;
  y: number;
};

type TSliderCoords = {
  x: number;
  y: number;
};

export type { TViews, TCoords, TSliderCoords };
