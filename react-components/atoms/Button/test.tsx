import '@testing-library/jest-dom';
import { screen, fireEvent, render } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { Button } from './index';

const glob = global as any;

describe('Button tests', () => {
  const getButtonByText = (text: string) => screen.getByText(text, undefined)
    .closest('button') as HTMLButtonElement;

  const getMockFn = (): any => {
    const mockFn = () => {
      mockFn.countCalls++;
    };
    mockFn.countCalls = 0;
    return mockFn;
  };

  let container: HTMLElement;

  beforeEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  test('render', () => {
    const buttonContent = 'test-button';

    const getElement = () => (
      <Button native={{ className: 'test' }}>{buttonContent}</Button>
    );

    render(
      getElement(),
      {
        hydrate: true,
        container: glob.runInServerEnv(
          () => {
            container.innerHTML = renderToString(getElement());
            return container;
          },
        ),
      },
    );

    const button = getButtonByText(buttonContent);

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('test');
    expect(button).toHaveClass('button');
    expect(button.querySelector('.button-content')?.innerHTML).toEqual(buttonContent);
  });

  test('onClick', () => {
    const buttonContent = 'test-button';
    const onClick = getMockFn();

    const getElement = () => (
      <Button native={{ onClick }}>{buttonContent}</Button>
    );

    render(
      getElement(),
      {
        hydrate: true,
        container: glob.runInServerEnv(
          () => {
            container.innerHTML = renderToString(getElement());
            return container;
          },
        ),
      },
    );

    const button = getButtonByText(buttonContent);
    fireEvent.click(button);
    expect(onClick.countCalls).toEqual(1);
  });

  test('disabled', () => {
    const buttonContent = 'test-button';
    const onClick = getMockFn();

    const getElement = () => (
      <Button native={{ onClick, className: 'test', disabled: true }}>{buttonContent}</Button>
    );

    render(
      getElement(),
      {
        hydrate: true,
        container: glob.runInServerEnv(
          () => {
            container.innerHTML = renderToString(getElement());
            return container;
          },
        ),
      },
    );
    const button = getButtonByText(buttonContent);

    fireEvent.click(button);
    expect(onClick.countCalls).toEqual(0);

    expect(button).toHaveClass('test');
    expect(button).toHaveClass('disabled');
    expect(button).toBeDisabled();
  });

  test('icon render', () => {
    const buttonContent = 'test-button-icon';
    const onClick = getMockFn();

    const getElement = () => (
      <Button icon="icon" native={{ onClick }}>{buttonContent}</Button>
    );

    render(
      getElement(),
      {
        hydrate: true,
        container: glob.runInServerEnv(
          () => {
            container.innerHTML = renderToString(getElement());
            return container;
          },
        ),
      },
    );
    const button = getButtonByText(buttonContent);
    const icon = button.querySelector('.icon') as HTMLSpanElement;

    fireEvent.click(icon);
    expect(onClick.countCalls).toEqual(1);

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('button-icon');
    expect(icon.nextSibling).toHaveClass('button-content');
  });
});
