/**
 * @type {import('next').NextConfig}
 */
import path from 'path';
import { getWebpackAliases } from './setup.mjs';

export default (phase) => {
  const webpackAliases = getWebpackAliases();
  console.log({ webpackAliases });
  const nextJsConfig = {
    sassOptions: {
      includePaths: [path.join(path.resolve(), 'styles')],
    },
    webpack: (config, options) => {
      return {
        ...config,
        resolve: {
          ...config.resolve,
          extensions: ['.ts', '.tsx', '.js'],
          alias: {
            ...config.resolve.alias,
            ...webpackAliases,
          },
        },

        module: {
          ...config.module,
          rules: [
            ...config.module.rules,
            {
              [Symbol('webpack-rule-name')]: 'typescript-file',
              test: /\.tsx?$/,
              use: [
                {
                  loader: 'ts-loader',
                  options: {

                    transpileOnly: true,
                  },
                },
              ],
            },
          ],
        },

      };
    },
  };
  return nextJsConfig;
};
