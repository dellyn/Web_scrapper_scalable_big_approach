import path from 'path';
import fs from 'fs';

const tsConfigPath = path.resolve('./tsconfig.json');

function resolvePath(directory, relativePath) {
  return path.resolve(directory, relativePath.replace('/*', ''));
}

function parseTsConfig() {
  const tsConfigRaw = fs.readFileSync(tsConfigPath, 'utf8');
  return JSON.parse(tsConfigRaw);
}

function getWebpackAliasesFromTsConfig(directory = path.resolve()) {
  const tsConfig = parseTsConfig();
  const paths = tsConfig.compilerOptions.paths || {};
  return Object.keys(paths).reduce((aliases, alias) => {
    if (paths[alias].length > 0) {
      aliases[alias.replace('/*', '')] = paths[alias].map((aliasPath) => resolvePath(directory, aliasPath));
    }
    return aliases;
  }, {});
}

export { getWebpackAliasesFromTsConfig as getWebpackAliases };
