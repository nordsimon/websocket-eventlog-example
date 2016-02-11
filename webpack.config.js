module.exports = {
  context: __dirname,
  entry: "./src/index.js",
  output: {
    filename: "client.js", // no hash in main.js because index.html is a static page
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.json$/,
        loader: 'json', // 'babel-loader' is also a legal name to reference
      }
    ]
  }
}
