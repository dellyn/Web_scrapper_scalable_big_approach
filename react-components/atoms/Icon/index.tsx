import {
  forwardRef, useRef, useImperativeHandle,
  PropsWithChildren,
} from 'react';
import { createClassName } from '#libraries/html/createClassName';
import type { IconProps, IconRefs } from './types';

const Icon = forwardRef<IconRefs, PropsWithChildren<IconProps>>(({
  children,
  iconPosition = 'left',
  native = {},
}, ref) => {
  const iconRef = useRef<HTMLSpanElement | null>(null);

  useImperativeHandle(ref, () => ({
    get iconRef() {
      return iconRef;
    },
  }));

  if (!children) {
    return null;
  }

  return (
    <span
      ref={iconRef}
      aria-hidden={true}
      role="presentation"
      {...native}
      className={
        createClassName('icon')
          .add(native.className || '', iconPosition)
      }
    >
      {children}
    </span>
  );
});

Icon.displayName = 'Icon';
export { Icon };
