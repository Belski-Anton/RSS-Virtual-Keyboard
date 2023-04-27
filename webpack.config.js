const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');



const devServer = (isDev) => !isDev ? {} : {
   devServer: {
      static: {
         directory: path.join(__dirname, "./")
       },
       compress: true,
       port: 8080,
   },
 };

module.exports =({development})=> ({
   mode: development ? 'development' : 'production',
   devtool: development ? 'inline-source-map' : false,
   entry: {
      main: './src/index.js'
   },
   output:{
      path:path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      assetModuleFilename:'assets/[name][ext]',
   },
   module:{
    rules:[
      {
         test: /\.(ico|png|svg|jpg|jpeg|gif)$/i,
         type: 'asset/resource',
      },
      {
         test: /\.(woff|woff2|eot|ttf|otf)$/i,
         type: 'asset/resource',
       },
       {
         test: /\.css$/i,
         use: [MiniCssExtractPlugin.loader, 'css-loader'],
       },
       {
         test: /\.s[ac]ss$/i,
         use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
       }
    ]   
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: path.resolve(__dirname, './src/index.html'), 
      }),
     
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),

    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
   ],
   ...devServer(development)
});
