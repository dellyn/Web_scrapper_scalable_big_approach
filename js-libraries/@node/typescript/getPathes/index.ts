import {
  AbsFilePath, DirPath, FilePath, TsconfigFile,
} from '#libraries/@interfaces';
import { requireFileSafe } from '#libraries/@node/fs/requireFileSafe';
import { normalizePathes } from '#libraries/@node/typescript/normalizePathes';

type AliasName = string;
type AliasPath = (DirPath | FilePath)[];

export const getPathes = (
  pathToTsconfigFile: AbsFilePath,
): Map<AliasName, AliasPath> => {
  const result = new Map<AliasName, AliasPath>();
  const r = requireFileSafe<TsconfigFile>(pathToTsconfigFile, false);
  if (!r) {
    return result;
  }
  return normalizePathes(r?.compilerOptions?.paths as any || {});
};
