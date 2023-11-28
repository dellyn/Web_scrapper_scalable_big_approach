import {
  getElementWidthWithoutPaddings as core,
} from '#libraries/@core/html/getElementWidthWithoutPaddings';

export const getElementWidthWithoutPaddings = <T extends HTMLElement>(element: T) => {
  if (element) {
    return core(window.getComputedStyle, element);
  }
  return undefined;
};
