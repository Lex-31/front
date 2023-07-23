const menuItems = document.querySelectorAll('.menu__list-link'); //берем все элесенты меню
menuItems.forEach(function (item) { // Перебираем все элементы меню
  const href = item.getAttribute('href'); //ссылка из открытой html страницы
  const pathname = window.location.pathname.slice(1); //получение относительного адреса текущей открытой в браузере страницы. Удаление первого символа - /
  if (href === pathname) { // Проверяем, является ли текущая ссылка активной
    item.classList.add('menu__list-link--active'); // Добавляем класс для активного элемента меню для того чтобы закрасить синим
  }
});

const tabItem = document.querySelectorAll('.tabs__btn-item'); //берем список кнопок
const tabContent = document.querySelectorAll('.tabs__content-item'); //берем списки авто
tabItem.forEach(function (element) { //перебираем кнопочки
  element.addEventListener('click', open) //вешаем на каждую событие клика и функцию open
});
function open(event) {
  const tabTarget = event.currentTarget; //определяем элемент кнопочки на котором в данный момент происходит событие
  const button = tabTarget.dataset.button; //считываем его аттрибут data-button
  tabItem.forEach(function (element) { //опять перебираем кнопочки
    element.addEventListener('click', open) //опять вешаем на каждую событие клика и функцию open
  });
  tabItem.forEach(function (item) {  //опять перебираем кнопочки
    item.classList.remove('tabs__btn-item--active') //и удаляем класс у кнопок
  });

  tabTarget.classList.add('tabs__btn-item--active'); //добавляем класс кнопке на которой произошло событие

  tabContent.forEach(function (item) { //перебираем списки авто
    item.classList.remove('tabs__content-item--active'); //и удаляем класс у каждого списка
  });

  document.querySelector(`#${button}`).classList.add('tabs__content-item--active'); //берем аттрибут data-button у кнопочки по которой кликнули и используем его для того чтобы найти список авто по id соответсвующий названию кнопки. добавляем активный класс
}

//кнопка мобильного меню(перед свайпером ставим, так как не на главной свайпер не может найти класс и выдает ошибку)
const menuBtn = document.querySelector('.menu__btn'); //берем кнопку меню
const menuList = document.querySelector('.menu__list'); //берем список меню
menuBtn.addEventListener('click', () => { //событие клика вешаем на кнопочку меню
  menuList.classList.toggle('menu__list--active'); //списку меню добавляем/удаляем класс
});

const swiper = new Swiper(".swiper", { //плагин swiper вешаем на класс div элемента 
  effect: "fade", //эффект затенения слайда при переключении
  fadeEffect: { //параметры fade эффекта
    crossFade: true //чтобы содержимое не отображалось сзади или снизу
  },
  autoplay: { //параметры автосмены слайдов
    delay: 2500, //задержка между сменой слайдов мс
    disableOnInteraction: false,
  },
  pagination: { //параметры пагинации
    el: ".swiper-pagination", //пагинацию вешаем на класс div элемента
  },
});