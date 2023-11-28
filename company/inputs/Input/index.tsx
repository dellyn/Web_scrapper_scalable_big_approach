import { forwardRef } from 'react';
import { Input as BaseInput } from '#components/atoms/Input';
import { InputProps, InputRefs } from './types';
import classnames from 'classnames';
import styles from './styles.module.scss';

const Input = forwardRef<InputRefs, InputProps>(({
  native = {},
  ...restProps
}, ref) => {
  return (
    <BaseInput
      {...restProps}
      ref={ref}
      native={{
        ...native,
        className: classnames(styles.input, native.className),
      }}
    />
  );
});
Input.displayName = 'Input';
export { Input };
