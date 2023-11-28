import {
  MutableRefObject,
  ButtonHTMLAttributes,
  RenderNode,
} from 'react';

export type ButtonProps = {
  icon?: RenderNode;
  iconPosition?: 'left' | 'right';
  native?: ButtonHTMLAttributes<HTMLButtonElement>;
};

export type ButtonRefs = {
  buttonRef: MutableRefObject<HTMLButtonElement | null>;
};
