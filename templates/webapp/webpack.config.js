var webpack = require('webpack');

module.exports = {
    entry: "./client/scripts/index.jsx",
    output: {
        path: __dirname + '/public/js',
        filename: "app.bundle.js"
    },
    devtool: 'sourcemap',
    module: {
      loaders: [{
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['react', 'es2015']
        }
      }]
    },
    plugins: []
};
