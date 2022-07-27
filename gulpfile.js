import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import rename from 'gulp-rename';
import browser from 'browser-sync';

// Styles

export const styles = () => {
  return gulp.src('src/less/style.less', {
      sourcemaps: true
    })
    .pipe(plumber())
    .pipe(less())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('src/css', {
        sourcemaps: '.'
      }))
    .pipe(browser.stream());
}

// HTML

const html = () => {
  return gulp.src('src/*.html')
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'src'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload

const reload = (done) => {
  browser.reload();
  done();
}
// Watcher

const watcher = () => {
  gulp.watch('src/less/*.less', gulp.series(styles, reload));
  gulp.watch('src/*.html', gulp.series(html, reload));
}
// Default

export default gulp.series(
  gulp.parallel(
    styles,
    html,
  ),
  gulp.series(
    server,
    watcher
  ));
