import {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
  useEffect,
  useCallback,
  CSSProperties,
  ChangeEvent,
} from 'react';
import classnames from 'classnames';
import { getComputedTextStyles } from '#libraries/html/getComputedTextStyles';
import { getElementWidthWithoutPaddings } from '#libraries/html/getElementWidthWithoutPaddings';
import type { InputProps, InputRefs } from './types';

const virtualInputStyles: CSSProperties = {
  opacity: 0,
  position: 'absolute',
  left: -99999,
  top: -99999,
  boxSizing: 'border-box',
};

const Input = forwardRef<InputRefs, InputProps>(({
  native = {},
}, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const virtualInputRef = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(native.value || '');
  const [isDynamicWidth, setIsDynamicWidth] = useState(false);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    // here should be debounce implemented
    native.onChange(e);
  }, [native.onChange]);

  useImperativeHandle(ref, () => ({
    get inputRef() {
      return inputRef;
    },
  }));

  function defineIfInputShouldHaveDynamicWidth() {
    if (!virtualInputRef.current) {
      return;
    }
    virtualInputRef.current.innerHTML = '';
    // eslint-disable-next-line max-len
    const elementWidthWithoutPaddings = getElementWidthWithoutPaddings<HTMLSpanElement>(getComputedTextStyles, virtualInputRef.current);

    setIsDynamicWidth(!elementWidthWithoutPaddings);
    virtualInputRef.current.innerHTML = native.value as string || '';
  }

  useEffect(() => {
    defineIfInputShouldHaveDynamicWidth();
  }, []);

  // useEffect(() => {
  //   const virtualInput = virtualInputRef.current;

  //   if (!virtualInput || !isDynamicWidth) {
  //     return () => { };
  //   }
  //   const input = inputRef.current as HTMLInputElement;
  //   Object.assign(virtualInput.style, getComputedTextStyles(input));

  //   const observer = new ResizeObserver(() => {
  //     input.style.width = `${virtualInput.getBoundingClientRect().width}px`;
  //   });

  //   observer.observe(virtualInput);
  //   return () => observer.disconnect();
  // }, [isDynamicWidth]);

  return (
    <>
      <input
        {...native}
        type="text"
        value={value}
        autoComplete="off"
        onChange={onChange}
        ref={inputRef}
        className={classnames(
          'input',
          native.className,
          { disabled: native.disabled },
        )}
      />
      <span
        ref={virtualInputRef}
        style={virtualInputStyles}
        className={classnames('virtual-input')}
      >
        {value}
      </span>
    </>
  );
});

Input.displayName = 'Input';
export { Input };
