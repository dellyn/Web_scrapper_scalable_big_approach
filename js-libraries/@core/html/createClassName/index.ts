import { IClassesObject, IArgs } from './types';

const mapClassesFromObject = (classesObj: IClassesObject):string => {
  return Object.keys(classesObj).reduce((acc, key) => {
    if (classesObj[key]) {
      return `${acc} ${key}`.trim();
    }
    return acc;
  }, '');
};

const configureClassName = ({
  parts,
  baseClass,
}: IArgs) => {
  return parts.reduce((acc, part) => {
    if (typeof part === 'string') {
      return `${acc} ${part}`.trim();
    }
    if (typeof part === 'object' && part !== null) {
      return `${acc} ${mapClassesFromObject(part)}`;
    }
    return acc;
  }, typeof baseClass === 'string' ? baseClass : '');
};

export const createClassName = (baseClass: string) => {
  const add = (...parts: any[]) => configureClassName({ baseClass, parts });
  return { add };
};
