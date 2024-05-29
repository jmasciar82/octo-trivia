const { override, addBabelPreset, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
  addBabelPreset('@babel/preset-react'),
  addWebpackModuleRule({
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react']
      }
    }
  })
);
