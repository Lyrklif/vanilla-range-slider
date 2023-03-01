import Controller from './controller/controller';

const initSlider = (selector: string, params: any): void => {
  const element = document.querySelector(selector);
  if (!element) return;
  new Controller(element, params);
};

export default initSlider;
