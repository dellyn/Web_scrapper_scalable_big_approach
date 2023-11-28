import { forwardRef, PropsWithChildren } from 'react';
import { Button as BaseButton } from '#components/atoms/Button';
import classnames from 'classnames';
import { CompanyButtonProps, CompanyButtonRefs } from './types';
import styles from './styles.module.scss';

const CompanyButton = forwardRef<CompanyButtonRefs, PropsWithChildren<CompanyButtonProps>>(({
  children,
  native = {},
  ...restProps
}, ref) => {
  return (
    <BaseButton
      {...restProps}
      ref={ref}
      native={{
        ...native,
        className: classnames(styles.companyButton, native.className),
      }}
    >
      {children}
    </BaseButton>
  );
});
CompanyButton.displayName = 'CompanyButton';
export { CompanyButton as Button };
