import { AbsDirPath, DirPath, FilePath } from '#libraries/@interfaces';

export type AliasName = string;
export type AliasPath = DirPath | FilePath;
export type CacheKey = string;

export type UnaliasLoaderOptions = {
  pathesToLibraries?: AbsDirPath[];
  cache?: Map<string, {
    aliases: AliasName[];
    pathes: Map<AliasName, AliasPath[]>;
  }>
  cacheKeysMap?: Map<AbsDirPath, CacheKey>;
};
