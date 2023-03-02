import Container from './children/container/container';
import Bar from './children/bar/bar';
import Knob from './children/knob/knob';
import Input from './children/input/input';

type TViews = {
  container: Container;
  bar: Bar;
  from: {
    knob: Knob;
    input: Input;
  };
  to: null | {
    knob: Knob;
    input: Input;
  };
};

export type { TViews };
