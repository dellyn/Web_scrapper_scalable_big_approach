import '@testing-library/jest-dom';
import { screen, render, fireEvent } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { Input } from './index';
import { InputProps } from './types';

const glob = global as any;

describe('Input tests', () => {
  const getElementByDisplayValue = (value: string) => screen.getByDisplayValue(value, undefined)
    .closest('input') as HTMLButtonElement;
  const value = 'input value';

  let container: HTMLElement;
  const getMockClickFn = (): any => {
    const mockFn = () => {
      mockFn.countCalls++;
    };
    mockFn.countCalls = 0;

    return mockFn;
  };

  const renderInput = (props: InputProps) => {
    const element = <Input {...props} />;
    render(element, {
      hydrate: true,
      container: glob.runInServerEnv(
        () => {
          container.innerHTML = renderToString(element);
          return container;
        },
      ),
    });
  };

  beforeEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  test('render', () => {
    renderInput({ native: { value, className: 'test' } });

    const input = getElementByDisplayValue(value);

    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('test');
    expect(input).toHaveClass('input');
    expect(input).toHaveValue(value);
  });

  test('disabled', () => {
    const onClick = getMockClickFn();
    renderInput({ native: { value, onClick, disabled: true } });

    const input = getElementByDisplayValue(value);

    fireEvent.click(input);
    expect(onClick.countCalls).toEqual(0);
    expect(input).toHaveClass('disabled');
    expect(input).toBeDisabled();
    input.focus();
    expect(input).not.toHaveFocus();
  });

  test('should be able to enter text', () => {
    renderInput({ native: { value } });

    const input = getElementByDisplayValue(value);
    fireEvent.change(input, { target: { value } });
    expect(input).toHaveValue(value);
  });

  test('max/min length test', () => {
    const maxLength = 5;
    const minLength = 3;

    renderInput({ native: { value, maxLength, minLength } });

    const input = getElementByDisplayValue(value);

    expect(input).toHaveAttribute('maxLength', maxLength.toString());
    expect(input).toHaveAttribute('minLength', minLength.toString());
  });

  test('focus/blur handle test', () => {
    renderInput({ native: { value } });

    const input = getElementByDisplayValue(value);

    // im not sure if that's a good idea or not but fireEvent seems to be ok with this https://testing-library.com/docs/guide-events/
    input.focus();
    expect(input).toHaveFocus();

    input.blur();
    expect(input).not.toHaveFocus();
  });

  test('placeholder test', () => {
    const placeholderText = 'Enter your email';

    renderInput({ native: { value, placeholder: placeholderText } });

    const input = getElementByDisplayValue(value);

    // im not sure if that's a good idea or not but fireEvent seems to be ok with this https://testing-library.com/docs/guide-events/
    expect(input).toHaveAttribute('placeholder', placeholderText);
  });
});
