const autoprefixer = require("autoprefixer");
const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const config = {
  entry: ["./frontend/js/textiles.js", "./frontend/sass/textiles.scss"],
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./textiles.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["react", "es2015"]
        }
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["react", "es2015"]
        }
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      // {
      //   test: /\.html$/,
      //   loader: "html-loader"
      // },
      {
        test: /\.(s*)css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader?-url"
            },
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: () => [
                  require("postcss-flexbugs-fixes"),
                  autoprefixer({
                    browsers: [">1%", "last 4 versions", "Firefox ESR", "not ie < 9"],
                    flexbox: "no-2009"
                  })
                ]
              }
            },
            {
              loader: "sass-loader",
              options: {
                data: "$NODE_ENV: " + process.env.NODE_ENV + ";"
              }
            }
          ],
          fallback: "style-loader"
        })
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin(["NODE_ENV"]),
    new ExtractTextPlugin({
      filename: "./textiles.css"
    }),
    new BrowserSyncPlugin(
      {
        host: "localhost",
        port: 3000,
        server: { baseDir: ["dist"] }
      },
      {
        injectCss: true
      }
    )
  ]
};

if (process.env.NODE_ENV === "development") {
  config.devtool = "eval-source-map";
} else {
  config.plugins.push(new UglifyJSPlugin());
}

module.exports = config;
