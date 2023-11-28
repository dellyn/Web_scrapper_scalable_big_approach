import { createValueByKey } from '#libraries/@browser/objects/createValueByKey';

export const createAction = <Type extends string>(
  typeName: Type,
  createValue: (type: typeof typeName) => any,
) => {
  return createValueByKey(typeName, createValue);
};
