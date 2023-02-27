import controller from './controller/controller'

const initSlider = (selector: string, params: any): void => {
  const element  = document.querySelector(selector);
  if (element) controller(element, params)
};

export default initSlider;
