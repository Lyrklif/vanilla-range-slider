const modeStrict = 'strict';
const modeFree = 'free';

type TMode = 'free' | 'strict';

type TSliderProps = {
  min: number;
  max: number;
  step?: number;
  invert?: boolean;
  vertical?: boolean;
  range?: boolean;
  fill?: boolean;
  thumb?: boolean;
  invertThumb?: boolean;
  inputNameFrom?: string;
  inputNameTo?: string;
  scale?: boolean;
  mode: TMode;
  classes?: {
    container?: string;
    bar?: string;
    knobFrom?: string;
    knobTo?: string;
  };
};

type TSliderSettings = {
  min: number;
  max: number;
  step: number;
  mode: TMode;
  invert: boolean;
  vertical: boolean;
  range: boolean;
};

export { modeStrict, modeFree };
export type { TSliderProps, TSliderSettings, TMode };
