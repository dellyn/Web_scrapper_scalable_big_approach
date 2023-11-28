import { join } from 'path';

type TsconfigFile = { compilerOptions: { paths: Record<string, string[]> }};

type DirPath = string;
type FilePath = string;

type AliasName = string;
type AliasPath = (DirPath | FilePath)[];

export const normalizePathes = (
  pathes: Required<Required<TsconfigFile>['compilerOptions']>['paths'] = {},
  prefix = '',
): Map<AliasName, AliasPath> => {
  const result = new Map<AliasName, AliasPath>();
  const aliases = pathes;
  Object.keys(aliases).forEach((alias) => {
    const normalized = alias
      .replace(/\/\*$/, '')
      .trim();

    if (!normalized) {
      return;
    }

    result.set(
      normalized,
      [aliases[alias]]
        .flat(2)
        .map((p) => join(prefix, p.replace(/\/\*$/, '').trim())),
    );
  });
  return result;
};
