import { Meta } from '#libraries/@interfaces';

export const createValueByKey = <T>(
  keyName: string,
  createValue: (key: typeof keyName, meta?: Meta) => T,
  meta?: Meta,
) => {
  return {
    [keyName]: createValue(keyName, meta) as T,
  };
};
