export function getComputedTextStyles(element: HTMLElement, pseudoElt?: string) {
  const computedStyles = window.getComputedStyle(element, pseudoElt);
  const defaultPadding = '10px';
  return {
    fontSize: computedStyles.fontSize,
    fontFamily: computedStyles.fontFamily,
    fontStyle: computedStyles.fontStyle,
    letterSpacing: computedStyles.letterSpacing,
    textTransform: computedStyles.textTransform,
    border: computedStyles.border,
    paddingRight: !parseFloat(computedStyles.paddingRight) && defaultPadding,
  };
}
