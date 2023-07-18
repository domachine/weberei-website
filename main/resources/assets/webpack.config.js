import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { WebpackManifestPlugin } from 'webpack-manifest-plugin'
import CopyPlugin from 'copy-webpack-plugin'

const require = createRequire(import.meta.url)

const baseDirURL = new URL('../../', import.meta.url)
const isProduction = process.env.NODE_ENV === 'production'

export default /** @type {import('webpack').Configuration} */ ({
  mode: isProduction ? 'production' : 'development',
  entry: {
    website: ['./website.css'],
  },
  output: {
    path: fileURLToPath(new URL('public/assets', baseDirURL)),
    publicPath: '/assets/',
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
    new CopyPlugin({
      patterns: [
        {
          context: '.',
          from: '**/*.@(svg|webp|ico|png)',
          to: isProduction
            ? '[path][name].[contenthash][ext]'
            : '[path][name][ext]',
        },
      ],
    }),
    new WebpackManifestPlugin({ writeToFileEmit: true }),
  ],
  devServer: !isProduction ? { webSocketServer: false } : undefined,
})
