import controller from './controller/controller'

const initSlider = (selector: string): void => {
  const elements = document.querySelectorAll(selector);

  elements.forEach((elem: HTMLElement | Element) => {
    const params = {
      min: 1,
      max: 100,
    } 

    controller(elem, params)
  });
};

export default initSlider;
