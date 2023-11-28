import { HTMLAttributes, MutableRefObject } from 'react';

export type IconProps = {
  iconPosition?: 'left' | 'right'
  native?: HTMLAttributes<HTMLSpanElement>;
};

export type IconRefs = {
  iconRef: MutableRefObject<HTMLSpanElement | null>;
};
