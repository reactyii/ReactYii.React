const path = require('path');

module.exports = {
  mode: 'development',
  devtool: "inline-source-map",
  target: "node",
  entry: {
    ssr: './src/server.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'ssr'),
    filename: "[name].js"
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  module: {
    rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
        {
            test: /\.tsx?$/,
            use: {
                loader: 'ts-loader', options: {
                    configFile: 'ssr.tsconfig.json'
                }
            },
            exclude: /node_modules/,
        },
          { test: /\.css$/, loader: "css-loader" },
          { test: /\.svg$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=img/[name].[ext]' }
    ]
 }
}
