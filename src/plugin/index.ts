import Controller from './controller/controller';

const initSlider = (selector: string, params: any) => {
  const element = document.querySelector(selector);
  if (!element) return;
  new Controller(element, params);
};

export default initSlider;
