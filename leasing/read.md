Должен быть установлен Node.js, например .exe с офф сайта
npm view name versions //вывести список всех версий пакета name в репозиториях
node --version
npx --version
npm --version
npm rm --global gulp  //если ранее был установлен gulp. Удаляет gulp и удаляет из package.json
npm i --global gulp-cli  //если небыл установлен gulp
npm list -g --depth=0  //посмотреть все глобально установленные пакеты(C:\Users\Admin-PC\AppData\Roaming\npm). Глобально установленные пакеты подключать к проекту нельзя (npm ls -g --depth=0)
npm outdated --depth=0 //посмортеть устаревшие пакеты
npm init  //создание проекта, выполняется команда в папке где будет находится проект
npm i --save-dev gulp  //установка gulp локально с сохранением номера версии (npm i -D gulp)
npm i --save-dev gulp-sass  //установка препроцессора css gulp
npm i --save-dev sass  //установка пакета sass
Для отключения политики безопастности запускаем терминал powershell от админ и вводим Set-ExecutionPolicy RemoteSigned
npm i --save-dev gulp-concat  //объединение css и js файлов, так же может переименовывать файлы
npm i --save-dev browser-sync  //автоматическое обновление страниц браузера
npm i --save-dev gulp-uglify-es  //уменьшение файлов JS
npm i --save-dev jquery  //устанавливается в папку node_modules
npm i --save-dev gulp-autoprefixer  //будет добавлять к css стилям префиксы (для старых браузеров)
npm i --save-dev gulp-clean  //удаление файлов и дирректорий
npm i --save-dev gulp-imagemin@7.1.0  //сжатие картинок, последнюю версию 8 непонятно как подключать
npm i --save-dev del  //удаление файлов и дирректорий. вместо этого устанавливаем gulp-clean
npm i --save-dev gulp-avif  //конвертация картинок
npm i --save-dev gulp-webp  //конвертация картинок в webp
npm i --save-dev gulp-svg-sprite  //плагин создания svg спрайтов
npm i --save-dev gulp-cached  //заменен на gulp-newer
npm i --save-dev gulp-newer  //вместо gulp-cached. сокращает время обработки, так как допускает до конвертирования только новые и измененные картинки
npm i --save-dev gulp-fonter  //конвертироватует шрифт в формат woff
npm i --save-dev gulp-ttf2woff2  //конвертирует шрифт ttf2 в woff2
npm i --save-dev gulp-include  //плагин соединения html файлов

gulp styles  //однократное преобразование из scss в css
gulp sprite  //создание спрайтов из svg иконок
gulp images  //уменьшение и конвеертация изображений
gulp fonts  //конвертация шрифтов
gulp pages  //в папке pages/ пишем html код, а код будет конвертироваться в app/index.html
gulp watching  //отслеживание изменений в исходниках и запуск styles, Ctrl+C - остановка процесса отслеживания
gulp  //отслеживание изменений и обновление браузера
gulp build  //удаление папки dist с содержимым, создание папки dist, сохранение проекта в папку dist для продакшн

npm i  //выполняется команда из папки где будет находится проект, подтягивает все необходимые зависимости прописанные в package.json. Данная команда будет выполняться всегда когда нужно создать новый проект


"major.minor.patch"
"^4.14.0" //обновить минорную версию. от 4.14.0 до 4.20.5 (>=4.14.0 и <5.0.0)
"~4.14.0" //обновить патч. от 4.14.0 до 4.14.8 (>=4.14.0 и <4.15.0)
"*4.14.0" //любые свежие версии
"=4.14.0" или "4.14.0" //только эта версия