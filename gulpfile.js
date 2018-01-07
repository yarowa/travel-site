const gulp           =   require('gulp'),
      sass           =   require('gulp-sass'),
      postcss        =   require('gulp-postcss'),
      mixins         =   require('postcss-mixins')
      cssvars        =   require('postcss-simple-vars'),  
      autoprefixer   =   require('autoprefixer'),
      cssImort       =   require('postcss-import'),
      nested         =   require('postcss-nested'),
      del            =   require('del'),
      browserSync    =   require('browser-sync').create();

var paths = {
   home:  './*.html',
   scss: './app/scss/**/*.scss',
   scrpt: './app/assets/js/*.js'
}
gulp.task('clean', function () {
   return del(['build']);
})
///Compile Sass and inject to browser
gulp.task('sass', ['clean'], function () {
   return gulp.src(paths.scss)
               .pipe(sass().on('error', function (err) {
                  console.log(err.toString());
                  this.emit('end');
               }))
               .pipe(postcss([cssImort, autoprefixer, mixins, cssvars, nested]))
               .pipe(gulp.dest('./app/css'))
               .pipe(browserSync.stream());
});

gulp.task('scripts', ['clean'], function () {
   return gulp.src(paths.scrpt)
            .pipe(gulp.dest("./app/js"))
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
   gulp.watch(paths.scrpt, ['scripts']);
   gulp.watch(paths.home).on('change', browserSync.reload);
});
gulp.task('default', ['server']); 