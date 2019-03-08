const gulp = require('gulp');
const browserSync = require('browser-sync');
const webpack = require('webpack-stream');
const path = require('path');

function reload(done) {
  browserSync.reload();

  done();
}

function html(done) {
  gulp.src('./src/index.html')
      .pipe(gulp.dest('./dist'));

  done();
}

function js(done) {
  gulp.src('./src/index.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
          {
            test: /\.scss$/,
            use: [
              'style-loader',
              'css-loader',
              'sass-loader'
            ]
          },
          {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
              'file-loader',
              {
                loader: 'image-webpack-loader',
                options: {
                  bypassOnDebug: true, // webpack@1.x
                  disable: true, // webpack@2.x and newer
                },
              },
            ],
          }
        ]
      }
    }))
    .pipe(gulp.dest('./dist'));

  done();
}

function initSync(done) {
  browserSync.init({
    'server': './dist/'
  });

  done();
}

function watchFiles(done) {
  gulp.watch('./src/index.html', gulp.series(html, reload));
  gulp.watch('./src/**/*.js', gulp.series(js, reload));
  gulp.watch('./src/**/*.scss', gulp.series(js, reload));

  done();
}

gulp.task('default', gulp.series(watchFiles, initSync));

