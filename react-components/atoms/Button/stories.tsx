import { styled } from 'styled-components';
import { PropsWithChildren } from 'react';
import { Button as ButtonComponent } from './index';
import { ButtonProps } from './types';

export default {
  title: 'atoms/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  args: {
    icon: 'icon',
    children: ButtonComponent.displayName,
    native: {
      className: 'test',
    },
  } as ButtonProps,
  argTypes: {
    'native.onClick': { action: 'onClick' },
  },
};

const StyledDiv = styled.div`
  .presentation {
    .button {
      padding: 10px;
      border-radius: 5px;
      user-select: none;
      color: white;
      background-color: cornflowerblue;

      .icon {
        fill: white;
      }
    }
  }
`;

export const Button = ({
  children,
  native = {},
  ...restProps
}: PropsWithChildren<ButtonProps>) => {
  const rest = restProps as Record<string, unknown>;
  const onClick = rest['native.onClick'] as Required<ButtonProps>['native']['onClick'];
  if (!native.onClick && onClick) {
    native.onClick = onClick;
  }

  // wht do we remove onclick
  delete rest['native.onClick'];

  return (
    <>
      <ButtonComponent {...rest} native={{ ...native }}>{children}</ButtonComponent>
      <br />
      <br />
      <StyledDiv>
        <div className="presentation">
          <ButtonComponent {...rest} native={{ ...native }}>{children}</ButtonComponent>
        </div>
      </StyledDiv>
    </>
  );
};
