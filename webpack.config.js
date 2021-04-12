module.exports = {
  entry: './src/main.js',
  output: {
    filename: './public/bundle.js'
  },
  module: {
    rules: [
      {  
        test: /\/src\/(.*)\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      },
    ],
  }
}
