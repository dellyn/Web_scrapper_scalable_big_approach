// const tsConfigFile = require(join(__dirname, 'tsconfig.json'));

// module.exports = {
//   extends: '../js-packages/.eslintrc.js',
//   overrides: [
//     {
//       files: ['*.ts', '*.tsx'],
//       settings: {
//         'import/resolver': {
//           typescript: {
//             project: tsConfigFile,
//           },
//         },
//       },
//     },
//   ]

// };
module.exports = {
  extends: '../js-packages/.eslintrc.js',
  ignorePatterns: [
    '!app/.public',
  ],
};
