import { AbsDirPath, AbsFilePath, FieldName } from '#libraries/@interfaces';

export type TransformLoaderOptions = {
  transform?: Transform;
};

export type Transform = (
  content: string,
  assets: {
    filePath: AbsFilePath,
    dirPath: AbsDirPath,
    fileName: FieldName,
  },
) => string;
