const gulp           =   require('gulp'),
      webpack        =   require('webpack'),
      webpackStream  =   require('webpack-stream'),
      webpackConfig  =   require('./webpack.config.js'),
      sass           =   require('gulp-sass'),
      postcss        =   require('gulp-postcss'),
      mixins         =   require('postcss-mixins'),
      hexrgba        =   require('postcss-hexrgba'),
      cssvars        =   require('postcss-simple-vars'),  
      autoprefixer   =   require('autoprefixer'),
      cssImport      =   require('postcss-import'),
      nested         =   require('postcss-nested'),
      del            =   require('del'),
      notify         =   require('gulp-notify'),
      browserSync    =   require('browser-sync').create();

var paths = {
   home:  "./*.html",
   scss: "./app/scss/**/*.scss",
   scripts: './app/assets/js/**/*.js'


};
gulp.task('clean', function () {
   return del(['build']);
});
///Compile Sass and inject to browser
gulp.task('sass', ['clean'], function () {
   return gulp.src(paths.scss)
               .pipe(sass().on('error', function (err) {
                  console.log(err.toString());
                  this.emit('end');
               }))
               .pipe(postcss([cssImport, hexrgba, mixins, cssvars, nested, autoprefixer]))
               .pipe(gulp.dest('./app/css'))
               .pipe(browserSync.stream());
});

gulp.task('scripts', ['clean'], function () {
   return gulp.src(paths.scripts)
       .pipe(webpackStream(webpackConfig))
       .on('error', function(error) {    // Error reporting
           notify().write({
               message: error.message
           });
           this.emit('end'); /* Allow Webpack to continue watching on error */
       })
       .pipe(gulp.dest('./app/dist'))
       .pipe(notify({                    // Notify me when the file is built
           title:   'Webpack',
           message: 'Generated file: <%= file.relative %>',
       }))
       .pipe(browserSync.stream());

});

gulp.task('server', ['sass'], function () {
   
   browserSync.init({
      notify: false,
      server: {
         baseDir: "./"
      }
   });
   gulp.watch(paths.scss, ['sass']);
   gulp.watch(paths.scripts, ['scripts']);
   gulp.watch(paths.home).on('change', browserSync.reload);
});
gulp.task('default', ['server']); 