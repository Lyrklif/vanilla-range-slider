type TContainer = {
  top: number;
  left: number;
};

type TBar = {
  height: number;
  width: number;
};

type TControl = {
  value: number;
  percent: number;
};

type TSliderState = {
  container: TContainer;
  bar: TBar;
  from: TControl;
  to: TControl;
};

export type { TSliderState, TContainer, TBar, TControl };
