import { dirname, basename } from 'path';
import { interpolateName } from 'loader-utils';
import { LoaderContext } from 'webpack/types';
import { TransformLoaderOptions } from './types';

export function loader(
  this: LoaderContext<TransformLoaderOptions>,
  content: string,
) {
  const options = this.getOptions();
  if (!options || !options.transform) {
    return content;
  }
  const filePath = interpolateName(
    this as any,
    '[path][name].[ext]',
    {},
  );
  const dirPath = dirname(filePath);
  const fileName = basename(filePath);
  return options.transform(content, {
    filePath, dirPath, fileName,
  });
}
