/* eslint-disable
  global-require,
  import/no-dynamic-require,
  @typescript-eslint/no-var-requires,
*/
import { join } from 'path';

export const createAlias = (aliasName: string, libraryName: string, ukey = '') => {
  return `${aliasName}__${libraryName}${ukey ? `__${ukey}` : ''}`;
};

export const createAliases = (pathesToLibraries: string[] = [], ukey = '') => {
  const aliases: Record<string, string[]> = {};

  pathesToLibraries.forEach((pathToLibrary) => {
    const packageJsonFile = require(join(pathToLibrary, 'package.json'));
    const tsconfigJsonFile = require(join(pathToLibrary, 'tsconfig.json'));
    const { name } = packageJsonFile;
    const pathes = tsconfigJsonFile.compilerOptions.paths as Record<string, string[]>;

    Object.keys(pathes).forEach((alias) => {
      const normalizedAlias = alias.replace(/\/\*$/, '');
      aliases[createAlias(normalizedAlias, name as string, ukey)] = pathes[alias].map(
        (p) => join(pathToLibrary, p.replace(/\/\*$/, '')),
      );
    });
  });

  return aliases;
};
