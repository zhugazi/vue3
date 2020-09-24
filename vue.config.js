// module.exports = {
//     test: /\.css/,
//     use: [
//         MiniCssExtractPlugin.loader,
//         'css-loader',
//         {
//             loader: 'postcss-loader',
//             options: {
//                 plugins: () => [
//                     require('autoprefixer')({
//                         overrideBrowserslist: ['last 2 version'] //兼容信息设置
//                     })
//                 ]
//             }
//         }
//     ]
// }