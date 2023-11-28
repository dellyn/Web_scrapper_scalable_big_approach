/* eslint-disable
  @typescript-eslint/no-unsafe-call,
  @typescript-eslint/no-unsafe-return,
*/
import type { Resolver } from 'webpack/types';
import { AbsDirPath } from '#libraries/@interfaces';
import { createAliases, createAlias } from './helpers';

type Options = {
  pathesToLibraries: AbsDirPath[];
};

export class ResolveAliasesPlugin {
  private readonly options: Options;

  private readonly ukey: string;

  private readonly aliases: Record<string, string[]> = {};

  public getAliases() {
    return this.aliases;
  }

  constructor(options: Options) {
    this.options = options;
    this.ukey = Math.random().toString(36).substring(5);
    this.aliases = createAliases(this.options.pathesToLibraries, this.ukey);
  }

  apply(resolver: Resolver) {
    resolver.hooks.resolve.tapAsync('ResolveModulesPlugin', (request, resolveContext, callback) => {
      const name = (this.options.pathesToLibraries
        .find((ln) => (request?.path || '').indexOf(ln) > -1) || '')
        .split('/')
        .pop();

      if (!name) {
        return callback();
      }

      let alias = '';

      Object.keys(this.aliases).some((a) => {
        const packageName = request.request || '';
        if (a === createAlias(packageName, name, this.ukey)) {
          alias = a;
          return true;
        }

        const parts = packageName.split('/');

        if (a === createAlias(parts[0], name, this.ukey)) {
          alias = `${a}/${parts.slice(1).join('/')}`;
          return true;
        }

        return false;
      });

      if (!alias) {
        return callback();
      }

      return resolver.doResolve(
        resolver.hooks.resolve,
        { ...request, request: alias },
        null,
        resolveContext,
        callback,
      );
    });
  }
}
