export const createNameSpace = (baseName = '') => {
  const add = (...classNames: string[]): string => classNames.reduce(
    (mappedClass, className) => {
      if (typeof className !== 'string') return mappedClass;
      const trimmedClassName = className.trim();
      if (!trimmedClassName) return mappedClass;

      return mappedClass.length
        ? `${mappedClass}-${trimmedClassName}`
        : trimmedClassName;
    },
    typeof baseName === 'string' ? baseName.trim() : '',
  );
  return {
    add,
    name: () => baseName,
  };
};
