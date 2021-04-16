module.exports = {
  indexPath: 'index.php',
  publicPath: '/lk/',
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/sass/variables.scss";`
      },
    }
  },
  pluginOptions: {
    webpack: {
      dir: [
        './webpack'
      ]
    }
  },

}

