const webpack                = require('webpack');
const ExtractTextPlugin      = require('extract-text-webpack-plugin');

// インラインSourceMapの場合は、Rollbar側からSourceMapのダウンロードを試みるので、外部からアクセス可能なURLとする必要がある。
// publicPathにはbundleがホストされているURLを指定する必要がある
const PUBLIC_PATH = "https://<YOUR_HOST>/dist";

module.exports = {
  entry: "./entry.js",
  publicPath: PUBLIC_PATH,
  output: {
    path: "dist",
    filename: "bundle.js",
    // output.pathからの相対指定なので、bundle.js.mapのままとなり、期待通り動かない。
    // sourceMapFilename: "./[file].map",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        },
      },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css") }
    ]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      append: `\n//# sourceMappingURL=${/dist/}[url]`
    })
  ],
  debug: true
};
