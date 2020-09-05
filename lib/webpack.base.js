const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const glob = require('glob');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const autoprefixer = require('autoprefixer');


const projectRoot = process.cwd();
console.log("cdl="+projectRoot);
process.chdir(path.join(projectRoot),'template');

console.log("output:####"+path.join(projectRoot, 'dist'))

const setMPA = () => {
  const entry = {};

  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js')); // 获取目录
  console.log('entryFiles####:', entryFiles); //eslint-disable-line
  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];
    /// Users/chendelong/Documents/vue/webpack4/src/index/index.js
    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];
    console.log(`pageName=${pageName}`);

    entry[pageName] = entryFile;
    console.log(entry);
    return htmlWebpackPlugins.push(new HtmlWebpackPlugin({
      template: path.join(projectRoot, `src/${pageName}/index.html`),
      filename: `${pageName}.html`,
      chunks: ['vendor', pageName],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }));
  });

  return {
    entry,
    htmlWebpackPlugins,
  };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  output: {
    path:path.join(projectRoot, 'dist'),
    filename:'[name]_[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },
      {
        test: /.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer({
                  browsers: ['last 2 version', '>1%', 'ios 7'],
                }),
              ],
            },
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75, // 一个REM等于75PX
              remPrecision: 8, // rem保留8位小数
            },
          },
        ],
      },
      {
        test: /.(png|jpg|git|jpeg)$/,
        // use: [
        //     {
        //         loader:'url-loader',
        //         options: {
        //             limit:10240, //10K大小，如何打包图小于10K的话，会自动转换成base64字符,打进bundle.js里面
        //         }
        //     }
        // ]
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // 与style-loader互拆
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    function errorPlugin() {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
          console.log('上报错误');
          process.exit(1);
        }
      });
    },
  ].concat(htmlWebpackPlugins),
  stats: 'errors-only',
};
