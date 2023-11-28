import { getComputedTextStyles as core } from '#libraries/@core/html/getComputedTextStyles';

export const getComputedTextStyles = (element: HTMLInputElement, pseudoEl?: string) => {
  return core(element, pseudoEl);
};
