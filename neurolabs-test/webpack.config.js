module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                require('@tailwindcss/postcss'),
              ],
            },
          },
        },
      ],
    },
  ],
}