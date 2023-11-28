import { createFsFromVolume, Volume } from 'memfs';
import { webpack } from 'webpack';
import { Configuration, Compiler } from 'webpack/types';
import { AbsFilePath } from '#libraries/@interfaces';

type MakeConfig = (config: Configuration) => Configuration;

export const compileTStoJSString = async (
  entry: Configuration['entry'],
  tsconfig: AbsFilePath,
  makeConfig: MakeConfig = (config) => config,
): Promise<Result> => {
  const compiler: Compiler = webpack(makeConfig({
    entry,
    mode: 'production',
    output: {
      path: '/dist',
      filename: '[name]',
      libraryTarget: 'window',
    },
    resolve: {
      extensions: [
        '.ts',
        '.tsx',
        '.js',
      ],
    },
    devtool: false,
    module: {
      rules: [
        {
          test: /\.tsx?$/i,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: tsconfig,
                allowTsInNodeModules: true,
              },
            },
          ],
        },
      ],
    },
  }));
  const fs = createFsFromVolume(new Volume());
  compiler.outputFileSystem = fs;

  return new Promise((resolve) => {
    compiler.run((err, stats) => {
      if (err) {
        throw err;
      }
      if (stats?.hasErrors()) {
        throw new Error(stats.toString());
      }
      resolve(
        (fs.readdirSync('/dist') as string[])
          .reduce((res, fileName) => {
            res[fileName] = fs.readFileSync(`/dist/${fileName}`, 'utf-8').toString();
            return res;
          }, {} as Result),
      );
    });
  });
};

type Result = {
  [fileName: string]: string;
};
