export const getElementWidthWithoutPaddings = (
  getComputedStyle: typeof window['getComputedStyle'],
  element : HTMLElement,
) => {
  const style = getComputedStyle(element);
  const paddingLeft = parseFloat(style.paddingLeft);
  const paddingRight = parseFloat(style.paddingRight);

  return element.clientWidth - paddingLeft - paddingRight;
};
