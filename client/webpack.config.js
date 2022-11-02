const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');



module.exports = () => {
  
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath:""
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        favicon: "./favicon.ico"
       
      }),
    //added service worker and manfest file 
    
    new WebpackPwaManifest({
      name: 'JATE',
      short_name: 'JATE',
      description: 'PWA Text Editor',
      display: 'standalone',
      start_url: './',
      publicPath: './',
      fingerprints: false,
      inject: true,
      icons: [
        {
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),

          
        },
      ],
    }),
    new MiniCssExtractPlugin(),
    //creates manifest to dist folder
      new InjectManifest({
        swSrc: './src-sw.js',
       
      }), 
    
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread',
              '@babel/transform-runtime',],
            },
          },
        },
        
      ],
    },
   
  };
  
};


