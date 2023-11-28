import { join } from 'path';
import { interpolateName } from 'loader-utils';
import { LoaderContext } from 'webpack/types';
import { ArrayElement } from '#libraries/@interfaces';
import { mapValues } from '#libraries/@core/objects/mapValues';
import { getPathes } from '#libraries/@node/typescript/getPathes';
import {
  UnaliasLoaderOptions,
  AliasName,
  CacheKey,
  AliasPath,
} from './types';

const internalCache = new Map() as Required<Required<UnaliasLoaderOptions>['cache']>;
const internalCacheKeysMap = new Map() as Required<Required<UnaliasLoaderOptions>['cacheKeysMap']>;

const CACHE_KEY_SEPARATOR = '__@@__';

const createCacheKey = (
  path: ArrayElement<Required<UnaliasLoaderOptions>['pathesToLibraries']>,
  pathes: Record<AliasName, AliasPath | AliasPath[]>,
  cacheKeysMap: Required<Required<UnaliasLoaderOptions>['cacheKeysMap']>,
): CacheKey => {
  const cacheKey = `${path}${CACHE_KEY_SEPARATOR}${JSON.stringify(pathes)}`;
  cacheKeysMap.set(path, cacheKey);
  return cacheKey;
};

const createCache = (
  path: ArrayElement<Required<UnaliasLoaderOptions>['pathesToLibraries']>,
  cacheKeysMap: Required<Required<UnaliasLoaderOptions>['cacheKeysMap']>,
  cache: Required<Required<UnaliasLoaderOptions>['cache']>,
) => {
  const pathes = getPathes(join(path, 'tsconfig.json'));
  const { aliases, nPathes } = mapValues<{
    aliases: AliasName[];
    nPathes: Record<AliasName, AliasPath | AliasPath[]>;
  }>(
    Array.from(pathes)
      .reduce((res, [alias, p]) => {
        res.aliases.add(alias);
        res.nPathes[alias] = p;
        return res;
      }, {
        aliases: new Set<AliasName>(),
        nPathes: {} as Record<string, string | string[]>,
      }),
    {
      aliases: (v) => Array.from(v),
    },
  );

  const pathesKey = createCacheKey(path, nPathes, cacheKeysMap);
  if (cache.has(pathesKey)) {
    return;
  }

  cache.set(pathesKey, { pathes, aliases });
};

export function loader(
  this: LoaderContext<UnaliasLoaderOptions>,
  content: string,
) {
  const options = this.getOptions() || {};
  if (
    !options
    || !Array.isArray(options.pathesToLibraries)
    || options.pathesToLibraries.length < 1
  ) {
    return content;
  }

  const {
    cache = internalCache,
    cacheKeysMap = internalCacheKeysMap,
  } = options;

  const filePath = interpolateName(
    this as any,
    '[path][name].[ext]',
    {},
  );

  const context = options.pathesToLibraries.find((p) => filePath.indexOf(p) === 0);
  if (!context) {
    return content;
  }

  if (!cacheKeysMap.has(context)) {
    createCache(context, cacheKeysMap, cache);
  }

  const { aliases = [], pathes = new Map() } = cache.get(cacheKeysMap.get(context)!)!;

  let normalizedContent: string = content;

  [
    ...(Array.from(normalizedContent.matchAll(/from\s+(['"]([^'"]+)['"]);?/g)) || []),
    ...(Array.from(normalizedContent.matchAll(/@import\s+(['"]([^'"]+)['"]);?/g)) || []),
  ]
    .forEach(([, replacer, alias]) => {
      const aliasName = aliases.find((a) => alias.indexOf(a) === 0);
      if (!aliasName) {
        return;
      }
      const replaceAliasPath = pathes.get(aliasName)![0] as string;
      normalizedContent = normalizedContent
        .replace(new RegExp(replacer, 'g'), `'${join(context, alias.replace(aliasName, replaceAliasPath))
            .split('/').map((v, i, a) => {
              return a.length - 1 === i ? v.replace(/\.[^.]+$/, '') : v;
            }).join('/')
          }'`);
    });

  return normalizedContent;
}
