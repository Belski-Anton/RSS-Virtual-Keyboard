const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);

module.exports = {
   mode:'development',
   entry:'./src/index.js',
   output:{
      path:path.resolve(__dirname, 'dist'),
      filename:'bundle.js',
      assetModuleFilename:'assets/[name][ext]',
   },
   module:{
    rules:[
      {
         test: /\.(ico|png|svg|jpg|jpeg|gif)$/i,
         type: 'asset/resource',
      },
      {
         test: /\.html$/i,
         loader: 'html-loader'   
      },
      {
         test: /\.(woff|woff2|eot|ttf|otf)$/i,
         type: 'asset/resource',
       },
       {
         test: /\.css$/i,
         use: [MiniCssExtractPlugin.loader,"style-loader", "css-loader"],
       }
    ]   },
   plugins: [
      new HtmlWebpackPlugin({
         template:'./src/index.html'
      }),
      new CleanWebpackPlugin(),

      new MiniCssExtractPlugin({
        filename:'[name].[contenthash].css',  
      })
   ],
};
