import { AbsFilePath } from '#libraries/@interfaces';
import { getPathes } from '#libraries/@node/typescript/getPathes';

export const getAliases = (
  pathToTsconfigFile: AbsFilePath,
) => {
  const result = new Set<string>();
  const pathes = getPathes(pathToTsconfigFile);
  Array.from(pathes).forEach(([alias]) => {
    result.add(alias);
  });
  return result;
};
