module.exports = {
  outputDir: process.env.VUE_APP_MODE === 'test' ? 'dist/test-build' : 'dist/prod-build',
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

