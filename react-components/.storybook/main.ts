import { StorybookConfig } from '@storybook/react-webpack5/types'
import { syncProjects } from '#libraries/@node/typescript/syncProjects';
import { join } from 'path';
import babelConfig from '../.babelrc.json';

const rootDir = join(__dirname, '../');

const aliases = syncProjects({
  absDirectoryRoot: rootDir,
  mergeAliases: ['#libraries'],
  transform: (p, a) => {
    return [
      join(rootDir, p.at(-1) === '*' ? p.slice(0, p.length - 2) : p),
      a.at(-1) === '*' ? a.slice(0, a.length - 2) : a,
    ];
  },
});

const config: StorybookConfig = {
  stories: [
    "../atoms/**/stories.tsx",
  ],
  addons: [
    {
      name: '@storybook/addon-styling',
      options: {
        sass: {
          implementation: require('sass'),
        },
      },
    },
    "@storybook/addon-essentials",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: (config) => {
    config.resolve = {
      ...(config.resolve || {}),
    };

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      ...aliases,
    };

    (config.module?.rules || []).push({
      test: /js-libraries\/[^.]+\.tsx?$/i,
      use: [
        {
          loader: 'babel-loader',
          options: babelConfig,
        },
      ],
    });

    return config;
  },
};
export default config;
