import controller from './controller/controller'

const initSlider = (selector: string): void => {
  const elements: NodeListOf<Element> = document.querySelectorAll(selector);

  elements.forEach((elem: HTMLElement | Element) => {
    const params = {
      min: 0,
      max: 100,
      step: 1,
      invertDirection: true
    } 

    controller(elem, params)
  });
};

export default initSlider;
