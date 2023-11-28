type AliasName = string;
type AliasPath = string;

export const mergePathes = (options: {
  basePathes: Record<string, string[]>,
  incomingPathes: Record<string, string[]>,
  transform?: (path: AliasPath, alias: AliasName) => [AliasPath, AliasName],
}): Record<string, string[]> => {
  const {
    incomingPathes,
    transform = (p) => p,
  } = options;

  const basePathes = {
    ...options.basePathes,
  };

  Object.keys(basePathes).forEach((alias) => {
    if (!incomingPathes[alias]) {
      return;
    }

    let aliasPathes = basePathes[alias];
    if (!Array.isArray(aliasPathes)) {
      aliasPathes = [aliasPathes];
    }

    let nAlias = alias;
    let nPath = '';

    [incomingPathes[alias]]
      .flat(2)
      .forEach((path) => {
        [nPath, nAlias] = transform(path, alias);
        if (!aliasPathes.includes(nPath)) {
          (<string[]>aliasPathes).push(nPath);
        }
      });

    basePathes[nAlias] = aliasPathes;
  });

  Object.keys(incomingPathes).forEach((alias) => {
    if (basePathes[alias]) {
      return;
    }

    let nAlias = alias;
    let nPath = '';

    const aliasPathes = [incomingPathes[alias]]
      .flat(2)
      .map((path) => {
        [nPath, nAlias] = transform(path, alias);
        return nPath;
      });

    basePathes[nAlias] = aliasPathes;
  });

  return basePathes;
};
