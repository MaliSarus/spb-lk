module.exports = {
    publicPath: '/front/',
    filenameHashing: false,
    css: {
        loaderOptions: {
            scss: {
                additionalData: `@import "~@/assets/sass/variables.scss";`
            },
        }
    }
}