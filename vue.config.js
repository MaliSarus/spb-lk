module.exports = {
    indexPath: 'index.php',
    publicPath: '/lk/',
    filenameHashing: false,
    css: {
        loaderOptions: {
            scss: {
                additionalData: `@import "~@/assets/sass/variables.scss";`
            },
        }
    },
}