const menuItems = document.querySelectorAll('.menu__list-link'); //берем все элесенты меню
menuItems.forEach(function (item) { // Перебираем все элементы меню
  const href = item.getAttribute('href'); //ссылка из открытой html страницы
  const pathname = window.location.pathname.slice(1); //получение относительного адреса текущей открытой в браузере страницы. Удаление первого символа - /
  if (href === pathname) { // Проверяем, является ли текущая ссылка активной
    item.classList.add('menu__list-link--active'); // Добавляем класс для активного элемента меню
  }
});

const tabItem = document.querySelectorAll('.tabs__btn-item');
const tabContent = document.querySelectorAll('.tabs__content-item');
tabItem.forEach(function (element) {
  element.addEventListener('click', open)
});
function open(event) {
  const tabTarget = event.currentTarget;
  const button = tabTarget.dataset.button;
  tabItem.forEach(function (element) {
    element.addEventListener('click', open)
  });
  tabItem.forEach(function (item) {
    item.classList.remove('tabs__btn-item--active')
  });

  tabTarget.classList.add('tabs__btn-item--active');

  tabContent.forEach(function (item) {
    item.classList.remove('tabs__content-item--active');
  });

  document.querySelector(`#${button}`).classList.add('tabs__content-item--active');
}

const swiper = new Swiper(".swiper", {
  effect: "fade",
  fadeEffect: {
    crossFade: true
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});

