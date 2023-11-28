/* eslint-disable
  global-require,
  import/no-dynamic-require,
  @typescript-eslint/no-var-requires,
  @typescript-eslint/no-non-null-assertion,
*/
import { join } from 'path';
import { mergePathes } from '../mergePathes';
import { normalizePathes } from '../normalizePathes';

type TsconfigFile = { compilerOptions: { paths: Record<string, string[]> }};

export const syncProjects = (options: {
  absDirectoryRoot: string;
  mergeAliases: string[];
  transform?: Required<Parameters<typeof mergePathes>[0]>['transform'];
}): any => {
  const { absDirectoryRoot, mergeAliases, transform } = options;
  const rootTSConfigFile: Required<TsconfigFile> = require(join(absDirectoryRoot, 'tsconfig.json'));
  let rootPathes = rootTSConfigFile.compilerOptions.paths!;

  const normalizedPathes = normalizePathes(rootPathes);

  mergeAliases.forEach((alias) => {
    const librariesPathes = normalizedPathes.get(alias)!;
    librariesPathes.forEach((librariesPath) => {
      rootPathes = mergePathes({
        basePathes: rootPathes,
        incomingPathes: [librariesPath].map<any>((p) => {
          try {
            return ((require(join(absDirectoryRoot, p, 'tsconfig.json'))) as TsconfigFile).compilerOptions!.paths;
          } catch {
            return {};
          }
        })[0],
        transform: (p, a) => {
          return [join(librariesPath, p), a];
        },
      }) as any;
    });
  });

  if (!transform) {
    return rootPathes;
  }

  return Object.keys(rootPathes).reduce((result, aliasName) => {
    [rootPathes[aliasName]]
      .flat(2)
      .forEach((aliasPath) => {
        const [newPath, newAlias] = transform(aliasPath, aliasName);
        if (!result[newAlias]) {
          result[newAlias] = [];
        }
        result[newAlias].push(newPath);
      });
    return result;
  }, {} as Record<string, string[]>);
};
