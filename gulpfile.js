const {src, dest, parallel, series, watch} = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const gcmq = require('gulp-group-css-media-queries')
const sassGlob     = require('gulp-sass-glob')


function styles() {
    return src('public/assets/sass/**/*.scss')
        .pipe(sassGlob())
        .pipe(sass({
            outputStyle: 'compact'
        }))
        .pipe(autoprefixer({overrideBrowserslist: ['last 10 versions'], grid: true, cascade: false}))
        .pipe(gcmq())
        // .pipe(rename('app.min.css'))
        .pipe(dest('public/assets/css'))

}




function startwatch() {
    watch('public/assets/sass/**/*', {usePolling: true}, styles);
}

exports.styles = styles

exports.default = series(styles, parallel(startwatch))