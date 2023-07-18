import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import { GenerateSW } from 'workbox-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const require = createRequire(import.meta.url)

const baseDirURL = new URL('../../', import.meta.url)
const isProduction = process.env.NODE_ENV === 'production'

export default /** @type {import('webpack').Configuration} */ ({
  mode: isProduction ? 'production' : 'development',
  entry: {
    main: ['./main.css', './main.js'],
  },
  output: {
    path: fileURLToPath(new URL('public/app/', baseDirURL)),
    publicPath: '/app/',
    ...(isProduction ? { filename: '[name].[contenthash].js' } : {}),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          require.resolve('css-loader'),
          {
            loader: require.resolve('postcss-loader'),
            options: {
              postcssOptions: {
                plugins: [
                  require.resolve('autoprefixer'),
                  [
                    require.resolve('tailwindcss'),
                    { config: './tailwind.config.cjs' },
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      ...(isProduction
        ? { filename: '[name].[contenthash].css' }
        : { filename: '[name].css' }),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '**/*.@(svg|webp|ico|png)',
          globOptions: {
            ignore: [fileURLToPath(new URL('images/icons', import.meta.url))],
          },
          to: isProduction
            ? '[path][name].[contenthash][ext]'
            : '[path][name][ext]',
        },
        {
          from: '@(app.webmanifest|images/icons/**/*)',
          to: '[path][name][ext]',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      favicon: './favicon.ico',
      title: 'App',
      template: './index.html',
    }),
    ...(isProduction
      ? [
          new GenerateSW({
            skipWaiting: true,
            maximumFileSizeToCacheInBytes: 1024 * 1024 * 1024 * 5,
            navigateFallback: '/app/index.html',
          }),
        ]
      : []),
  ],
  devServer: {
    webSocketServer: false,
    port: 8081,
    historyApiFallback: {
      rewrites: [{ from: /./, to: '/app/index.html' }],
    },
  },
})
