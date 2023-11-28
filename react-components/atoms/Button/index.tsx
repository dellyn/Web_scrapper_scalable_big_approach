import {
  forwardRef, useImperativeHandle, useRef, PropsWithChildren,
} from 'react';
import classnames from 'classnames';
import { Icon } from '#components/atoms/Icon';
import type { ButtonProps, ButtonRefs } from './types';
import styles from './styles.module.scss';

type Props = PropsWithChildren<ButtonProps>;

const Button = forwardRef<ButtonRefs, Props>((({
  icon,
  iconPosition = 'left',
  children,
  native = {},
}, ref) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useImperativeHandle(ref, () => ({
    get buttonRef() {
      return buttonRef;
    },
  }));

  const iconNode = (
    <Icon
      native={{
        className: classnames('icon', { disabled: native.disabled }),
        onClick: () => { },
      }}>
      {icon}
    </Icon>
  );

  return (
    <button
      {...native}
      ref={buttonRef}
      className={classnames(styles.button, native.className, { disabled: native.disabled })}
    >
      {iconPosition === 'left' && iconNode}
      <div
        className={classnames('base-button-icon')}
        role="presentation"
        aria-hidden={true}
      >
        {children}
      </div>
      {iconPosition === 'right' && iconNode}
    </button>
  );
}));
Button.displayName = 'Button';
export { Button };
