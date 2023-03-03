type TSliderProps = {
  min: number;
  max: number;
  step?: number;
  invert?: boolean;
  vertical?: boolean;
  range?: boolean;
  fill?: boolean;
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
  invert: boolean;
  vertical: boolean;
  range: boolean;
};

export type { TSliderProps, TSliderSettings };
