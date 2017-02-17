/* === PLUGINS === */
const gulp = require('gulp'),
    gutil = require('gulp-util'),
    gmocha = require('gulp-mocha'),
    rimraf = require('gulp-rimraf'),
    webpack = require('webpack');

const WebpackDevServer = require('webpack-dev-server');

/* === CONFIG === */
const cfg = require('./webpack.config');

const DEV_SERVER_DOMAIN = 'localhost',
    DEV_SERVER_PORT = 8080;

/* === TASKS === */
gulp.task('default', ['build']);

gulp.task('clean', function () {
    return gulp.src(['./dist'], {read: false})
        .pipe(rimraf());
});

gulp.task('build', ['clean'], function (callback) {
    webpack(cfg, function (err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }
        gutil.log('[webpack]', stats.toString({colors: true}));
        callback();
    });
});

gulp.task('serve', function () {
    // Start the server
    new WebpackDevServer(webpack(cfg), {
        contentBase: '.',
        publicPath: '/dist/',
        stats: {colors: true}
    }).listen(DEV_SERVER_PORT, DEV_SERVER_DOMAIN, function (err) {
        if (err) {
            throw new gutil.PluginError('webpack-dev-server', err);
        }
    });
});

gulp.task('test', function () {
    gulp.src('test/*.js', {read: false})
        .pipe(gmocha({reporter: 'nyan'}))
});
