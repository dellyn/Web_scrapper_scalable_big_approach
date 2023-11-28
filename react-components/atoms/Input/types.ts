import { InputHTMLAttributes, MutableRefObject } from 'react';

export type InputProps = {
  debounceMs?: number;
  native?: InputHTMLAttributes<HTMLInputElement>;
};

export type InputRefs = {
  inputRef?: MutableRefObject<HTMLInputElement | null>;
};
