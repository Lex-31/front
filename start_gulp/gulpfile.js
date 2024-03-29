const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const del = require('del');
const browserSync = require('browser-sync').create();

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/', //локальный сервер запускается из этой дирректории localhost:3000
    },
    // notify: false //непоказывать надпись в браузере BrowserSync: connected
  })
}

function styles() {
  return src('app/scss/style.scss') //берем scss файл
    .pipe(scss({ outputStyle: 'compressed' })) //минифицируем результирующий файл и преобразовываем в css
    .pipe(concat('style.min.css'))  //новое имя результирующего файла
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'], //поддерживать последние 10версий браузеров
      grid: true  //оставить grid включенным
    }))
    .pipe(dest('app/css')) //путь по которому сохраням результирующий файл
    .pipe(browserSync.stream()) //при необходимости будет обновляться страница браузера
}

function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'app/js/main.js'
  ])
    .pipe(concat('main.min.js')) //новое имя результирующего файла
    .pipe(uglify())  //минификация js файлов
    .pipe(dest('app/js'))  //путь по которому сохраням результирующий файл
    .pipe(browserSync.stream()) //при необходимости будет обновляться страница браузера

}

function images() {
  return src('app/images/**/*.*') //ищим исходники картинок
    .pipe(imagemin([  //запускаем минимизатор картинок с опциями
      imagemin.gifsicle({ interlaced: true }), //для gif
      imagemin.mozjpeg({ quality: 75, progressive: true }), //для jpg
      imagemin.optipng({ optimizationLevel: 5 }), //для png
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(dest('dist/images'))  //путь по которому сохраням результирующие файлы
}

function build() {
  return src([    //собираем все необходимые файлы для сайта
    'app/**/*.html',
    'app/css/style.min.css',
    'app/js/main.min.js'
  ], { base: 'app' }) //сохраняем дерево директорий такое же как было в app/
    .pipe(dest('dist')) //згружаем эти файлы в папку dist
}

function cleanDist() {
  return del('dist')
}

function watching() {
  watch(['app/scss/**/*.scss'], styles); //отслеживаем изменения в scss файлах и запускаем преобразование автоматически
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);  //отслеживаем изменения в js файлах (кроме main.min.js) и запускаем преобразование
  watch(['app/**/*.html']).on('change', browserSync.reload); //отслеживаем все файлы html и перезагружаем при необходимости
}

exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build); //при вводе команды gulp build последовательно удаляем папку dist, минимизируем и сохр в dist картинки, собираем все файлы для сайта в папку dist

exports.default = parallel(styles, scripts, browsersync, watching); //при вводе команды gulp выполняем параллельно все что в скобках. Для локальной разработки