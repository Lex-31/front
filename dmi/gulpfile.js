const { src, dest, watch, parallel, series } = require('gulp'); //подключаем плагин gulp
const scss = require('gulp-sass')(require('sass')); //подключаем плагин препроцессора gulp-sass
const concat = require('gulp-concat'); //подключаем плагин конкатанации файлов
const uglify = require('gulp-uglify-es').default; //подключаем плагин уменьшение файлов JS !найти инструкцию по опциям сжатия
const browserSync = require('browser-sync').create(); //подключаем плагин обновления страниц браузера
const autoprefixer = require('gulp-autoprefixer');  //подключаем плагин для добавления к css стилям префиксов (для старых браузеров)
const clean = require('gulp-clean');  //подключаем плагин удаления файлов и дирректорий
// const avif = require('gulp-avif');  //плагин сжатия и конвертации картинок
// const webp = require('gulp-webp');  //плагин конвертации картинок в webp
const imagemin = require('gulp-imagemin');  //плагин сжатие картинок
const newer = require('gulp-newer');  //плагин для того чтобы выполнять операции с новыми файлами или измененными, а старые не трогать чтобы быстрее работать
const fonter = require('gulp-fonter');  //плагин конвертиртации шрифта в формат woff
const ttf2woff2 = require('gulp-ttf2woff2');  //плагин конвертации ttf в woff2
const svgSprite = require('gulp-svg-sprite');  //плагин создания svg спрайтов
const include = require('gulp-include');  //плагин объединения html файлов по принципу шаблона

function pages() {  //функция объединения html файлов из разных мест
  return src('app/pages/*.html')  //берем написанный нами код
    .pipe(include({  //объединяем с...
      includePaths: 'app/components'  //папка-источник с html частями, которые будут браться в качестве элементов шаблна
    }))
    .pipe(dest('app'))  //выгружаем в app/index.html и др. страницы
    .pipe(browserSync.stream());  //обновляем страницу браузера
  ;
}

function fonts() {  //конвертация шрифтов
  return src('app/fonts/src/*.*')  //подключаем папку с исходниками шрифтов
    .pipe(fonter({ formats: ['woff'] }))  //fonter конвертирует форматы в woff

    .pipe(src('app/fonts/src/*.ttf'))  //берем TTF шрифты из исходников и передаем их в ttf2woff2
    .pipe(ttf2woff2())  //ttf2woff2 конвертирует из TTF в WOFF2

    // .pipe(src('app/fonts/src/*.ttf'))  //берем только TTF шрифты из исходников если они там есть
    .pipe(dest('app/fonts'))  //результаты отправляем в папку app/fonts
    ;
}

function images() {  //конвертация и сжатие картинок
  return src([
    'app/images/src/*.*',  //берем все файлы в папке app/images/src/ оригиналы картинок
    '!app/images/src/*.svg',  //кроме svg картинок
  ])
    /*Конвертация в AVIF*/
    // .pipe(newer('app/images'))  //*показываем newer где лежат обработанные файлы которые не надо повторно отправлять на конвертацию
    // .pipe(avif({ quality: 50 }))  //сжимаем и конвертируем картинки из PNG и JPG в AVIF
    /*Конвертация в WEBP*/
    // .pipe(src(['app/images/src/*.*',]))  //берем все файлы в папке app/images/src/ оригиналы картинок
    // .pipe(newer('app/images'))  //*показываем newer где лежат обработанные файлы
    // .pipe(webp())  //конвертируем в webp

    .pipe(src(['app/images/src/*.*',]))  //берем все файлы в папке app/images/src/ оригиналы картинок
    .pipe(newer('app/images'))  //*показываем newer где лежат обработанные файлы
    .pipe(imagemin())  //минифицируем

    .pipe(dest('app/images'));  //*и сохраняем всё в папку app/images
}

function sprite() {  //создание спрайтов из svg иконок
  return src([
    'app/images/*.svg',  //*берем все файлы svg (уже минифицированые) в папке app/images/
    '!app/images/sprite.svg',  //*кроме файла готового svg спрайта старого
  ])
    .pipe(svgSprite({  //деламе спрайт svg
      mode: {
        stack: {
          sprite: '../sprite.svg',  //всеь svg код сохраняем в этот файл
          example: true  //чтобы создавался дополнительный файлик примера в папке stack/sprite.stack.html
        }
      }
    }))
    .pipe(dest('app/images'));  //*и сохраняем в папку app/images
}

function scripts() {  //уменьшение и объединение файлов JS
  return src([  //список файлов-исходников
    // '',  //дополнительные файлы js и файлы js расширений
    'app/js/main.js', //основной файл

    // 'app/js/**/*.js', //все файлы js в папке app/js/ 
    // '!app/js/main.min.js', //кроме файла main.min.js в папке app/js/, чтобы не за циклить
  ])
    .pipe(concat('main.min.js'))  //переименовываем файл
    // .pipe(uglify())  //производим сжатие исходника
    .pipe(dest('app/js'))  //сохраняем в папку js файл main.min.js
    .pipe(browserSync.stream());  //обновляем страницу браузера
}

function styles() {  //конвертирование стилей из scss в css
  return src('app/scss/style.scss')  //указываем исходник scss. в исходнике делаем импорты других css файлов если надо
    .pipe(autoprefixer({  //использовать доп префиксы стилей для поддержки старых браузеров
      overrideBrowserslist: ['last 10 version'],  //будут поддерживаться 10 посл версий браузеров
      // browsers: [
      //   'Android >= 4',
      //   'Chrome >= 20',
      //   'Firefox >= 24',
      //   'Explorer >= 11',
      //   'iOS >= 6',
      //   'Opera >= 12',
      //   'Safari >= 6',
      // ],
      grid: true  //будет поддержка гридов в старых браузерах
    }))
    .pipe(concat('style.min.css'))  //переименовываем файл
    // .pipe(scss().on('error', scss.logError))  //конвертируем в css. Ошибки выводим в консоль
    // .pipe(scss({ outputStyle: 'compressed' }).on('error', scss.logError))  //Сжатие css
    .pipe(scss({ outputStyle: 'expanded' }).on('error', scss.logError))  //развернутый default
    .pipe(dest('app/css'))  //сохраняем в данную папку css файл style.min.css
    .pipe(browserSync.stream());  //обновляем страницу браузера
};

function watching() {  //автоматическое отслеживание изменений файлов исходников
  browserSync.init({  //автообновление страниц браузера
    server: {
      baseDir: 'app/',  //внутри этой директории будет отслеживаться файлы и обновляться страница браузера
    },
  });

  // watch(['app/scss/style.scss'], styles);  //следить за файлом style.scss в папке app/scss, если происходит изменение запускается функция styles
  watch(['app/scss/**/*.scss'], styles);  //следить за файлами с расширением .scss в папке app/scss с любым уровнем вложенности, если происходит изменение запускается функция styles
  watch(['app/images/src'], images);  //когда в исходники app/images/src добавят изображение новое, то запустится images - конвертация и сжатие картинок
  watch(['app/js/main.js'], scripts);  //следить за файлом main.js в папке app/js, если происходит изменение запускается функция scripts
  // watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts)  //следить за всеми файлами .js и не следить за файлом main.min.js в папке app/js, если происходит изменение запускается функция scripts
  watch(['app/components/*', 'app/pages/*'], pages);  //следить за папкой app/components и app/pages, если происходит изменение запускается функция pages
  watch(['app/*.html']).on('change', browserSync.reload);  //следить за html файлами в базовой дирректории app/, если происходит изменение то обновляется страница браузера
  // watch(['app/**/*.html']).on('change', browserSync.reload);  //следить за html файлами в базовой дирректории app/ и если есть еще дирректории в app/ то и и за ними будет следить, если происходит изменение то обновляется страница браузера
}

function cleanDist() {  //очистка продакшн папки dist
  // const fs = require('fs'); //модуль node.js работы с файлами/папками
  // fs.mkdir('dist', { recursive: true }, err => {  //создаем папку dist в любом случае, даже если она есть recursive: true
  //   if (err) throw err; // не удалось создать папку
  //   console.log('Папка успешно создана');
  // });
  return src('dist/*')  //удаление содержимого папки dist
    .pipe(clean());  //производим удаление
}

function building() {  //выгрузка в папку dist для продакшн
  return src([  //собираем готовые файлы на локалке:
    'app/css/style.min.css',  //файл стилей
    'app/video/*.*', //*видео и превьюшки в jpg
    'app/images/*.*',  //*файлы картинок
    // '!app/images/*.svg',  //*файлы svg не будем выгружать
    // 'app/images/sprite.svg',  //*а файл svg спрайта будем выгружать
    'app/fonts/*.*',  //файлы шрифтов
    'app/js/main.min.js',  //файл скриптов
    'app/js/swiper.js',  //файл скриптов
    // 'app/**/*.html',  //все html файлы
    'app/*.html',  //html основные файлы
    // '!app/images/stack/sprite.stack.html',  //*кроме файла html примера svg спрайтов
  ], { base: 'app', 'allowEmpty': true })  //корневая папка относительно которой нужно сохранить локацию папок и файлов, и разрешить
    .pipe(dest('dist'));  //выгружаем в папку dist для продакшн
}

exports.styles = styles; //экспортируем функцию, чтобы включать ее через консоль
exports.images = images; //экспортируем функцию, чтобы включать ее через консоль
exports.fonts = fonts; //экспортируем функцию, чтобы включать ее через консоль
exports.pages = pages; //экспортируем функцию, чтобы включать ее через консоль
exports.scripts = scripts; //экспортируем функцию, чтобы включать ее через консоль
exports.sprite = sprite; //экспортируем функцию, чтобы включать ее через консоль
exports.watching = watching; //экспортируем функцию, чтобы включать ее через консоль
exports.cleanDist = cleanDist; //экспортируем функцию, чтобы включать ее через консоль
exports.building = building; //экспортируем функцию, чтобы включать ее через консоль

exports.build = series(  //при запуске команды gulp build запускать в строгой последовательности сначала cleanDist - удаляем папку dist, затем images - уменьшаем изображения и закидываем в папку dist, затем building   - закидываем в папку dist остальные файлы для продакшн
  cleanDist,  //если папки dist нет в корне, то будет ругаться
  // images, 
  building,
);

exports.default = parallel(  //при запуске команды gulp запускать параллельно конвертнуть стили из scss в css, уменьшение-объединение JS scripts, инклудинг html страниц автообновление browsersync(встронно в начало функции watching) и отслеживание изменений watching
  styles,
  scripts,
  pages,
  watching,  //в watching в начале запускается browserSync автообновление страницы браузера при добавлении или редактировании чего либо в папке app/ 
);