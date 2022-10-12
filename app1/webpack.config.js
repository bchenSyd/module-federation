const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  devServer: {
    port: 3001,
    open: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app1", //<-------------  remote chunk(module collection) name;
      filename: "remoteEntry.js",
      exposes: {
        // expose each component
        "./CounterAppOne": "./src/components/CounterAppOne",
      },
      shared: {
        // Shared modules are modules that are both overridable and provided as overrides to nested container. 
        // They usually point to the same module in each build, e.g. the same library.
        react: {
          singleton: true /* only a single version, or a single instance is allowed */,
          eager: true, /* access this module on initial load of this chunk*/
          requiredVersion: "^18.2.0",
        },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: "^18.2.0",
        },
        "react-router-dom": {
          singleton: true,
          eager: true,
          requiredVersion: "^6.4.2",
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
