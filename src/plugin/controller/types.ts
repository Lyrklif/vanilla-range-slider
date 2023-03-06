enum MODE {
  free = 'free',
  strict = 'strict',
}

type TMode = MODE.free | MODE.strict;

type TSliderProps = {
  min: number;
  max: number;
  step?: number;
  invert?: boolean;
  vertical?: boolean;
  range?: boolean;
  fill?: boolean;
  invertThumb?: boolean;
  inputNameFrom?: string;
  inputNameTo?: string;
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

export { MODE };
export type { TSliderProps, TSliderSettings, TMode };
