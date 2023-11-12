//Кнопка меню
const btn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu__list');
const menuItems = document.querySelectorAll('.menu__list-link');

btn.addEventListener('click', () => { // скрол страницы вверх
  const scrollUp = () => { // прокрутка страницы вверх
    window.scrollTo({ //поднимаем страницу максим. вверх
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  const menuTopAdd = () => { // доб/уд класс, фиксирует от прокрутки
    menu.classList.toggle('menu__list--active'); // добавить/удалить новый класс 
    if (menu.classList.contains('menu__list--active')) { //если есть новый класс
      menuItems.forEach((menuItem) => { //перебираем все ссылки в меню
        menuItem.onclick = function () { //вешаем им событие клика по ссылке в меню
          menu.classList.remove('menu__list--active'); //удалить новый класс - закрыть меню
          document.body.style.overflow = ''; //разфиксируем body для перемещения
        };
      });
      document.body.style.overflow = 'hidden'; //фиксируем body от перемещения
    } else { //разфиксируем body для перемещения
      document.body.style.overflow = '';
    }
  }

  if (window.scrollY === 0) { // Страница уже в самом верху
    menuTopAdd(); // доб/уд класс, фиксирует от прокрутки
  } else {
    scrollUp(); // Сначала прокручиваем страницу вверх
    window.onscroll = function () { // Дождитесь завершения прокрутки
      if (window.scrollY === 0) { // Прокрутка достигла верха страницы
        menuTopAdd(); // доб/уд класс, фиксирует от прокрутки
        window.onscroll = null; // Удаляем обработчик, чтобы он больше не вызывался
      }
    };
  }

});

//Video overlay
if (window.location.pathname === '/index.html' || window.location.pathname === '/about.html') { //выполняем код только если находимся на странице
  console.log(window.location.pathname);
  const overlay = document.querySelector('.featured-right__video-overlay');
  const clip = document.querySelector('.featured-right__video-inner video');
  clip.volume = 0.3; //громкость на 50% выставляем
  overlay.onclick = function () { //когда кликаем на overlay
    clip.play(); //запускаем видео
    this.classList.add('featured-right__video-overlay--hidden'); //обращаемся к overlay, скрываем overlay
  };

  clip.onclick = function () { //когда кликаем на видео
    this.pause(); //ставим на паузу видео
    overlay.classList.remove('featured-right__video-overlay--hidden'); //показываем overlay
  }
}

//Кнопки на фотке
if (window.location.pathname === '/index.html') { //выполняем код только если находимся на странице
  const buttons = document.querySelectorAll('.program__item'); // Получите все элементы с классом
  buttons.forEach((button) => { // Проходимся по каждой кнопке и добавляем обработчик события клика
    button.addEventListener('click', () => {
      //активными могут быть несколько конопк
      /* if (button.classList.contains('program__item--active')) {  // Проверяем, есть ли у кнопки класс-модификатор
         button.classList.remove('program__item--active'); // Если есть, удалите его
       } else {
         button.classList.add('program__item--active'); // Если нет, добавьте его
       } */

      //активной может быть только одна кнопка
      buttons.forEach(function (btn) {
        btn.classList.remove('program__item--active');
      });
      button.classList.add('program__item--active');

    });

    const top = button.getAttribute('data-top'); // Получаем значение top из data-атрибута
    button.style.top = top + 'px'; // Установите индивидуальное значение top для текущей кнопки
  });
}


//Калькулятор ИМТ
// const inputFemale = document.getElementById('female');
// const inputMale = document.getElementById('male');
// const inputAge = document.getElementById('age');
// const inputWeight = document.getElementById('weight');
// const inputHeight = document.getElementById('height');
// const selectNode = document.getElementById('options');
// const btnResult = document.getElementById('btnResult');

// const outputResult = document.querySelector('.result');

// btnResult.addEventListener('click', (event) => {
//   event.preventDefault();
//   const female = inputFemale.checked; //true/false
//   const male = inputMale.checked; //true/false
//   const age = Number(inputAge.value);
//   const weight = Number(inputWeight.value);
//   const height = Number(inputHeight.value);
//   const selected = Number(selectNode.value);

//   outputResult.innerHTML = () => {
//     const expression = () => { //выражение без учета жен/муж
//     };

//     if (female) { //если для женщин
//       return expression();
//     } else { //если для мужчин
//       return expression();
//     }
//   };
// });


// Pop-up фото увеличение
if (window.location.pathname === '/about.html') { //выполняем код только если находимся на странице
  const certItems = document.querySelectorAll('.cert__item'); //берем все фото
  certItems.forEach((certItem) => { //перебираем их с помощью цикла
    certItem.addEventListener('click', function () { //навешиваем на каждую событие клика
      this.classList.toggle('pop-up'); //добавлять-удалять класс при клике 
      if (this.classList.contains('pop-up')) { //проверяем наличие класса, если есть класс...
        disablePageScroll(); //блокируем прокрутку фоновой страницы
      } else { //если нет класса...
        enablePageScroll(); //разблокировка прокрутки фоновой страницы
      }
    });
  });
}


//слайдер
if (window.location.pathname === '/index.html') { //выполняем код только если находимся на странице
  const swiper = new Swiper(".swiper", { //плагин swiper вешаем на класс div элемента 
    loop: true, //бесконечный слайд
    slidesPerView: 1, // сколько слайдов в активной области
    spaceBetween: 20, //расстояние между слайдами
    allowTouchMove: true, //разрешить листать свайпом
    centeredSlides: true, //по центру активный слайд
    pagination: { //параметры пагинации
      el: '.swiper-pagination', //пагинацию вешаем на класс div элемента
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
      1180: { // when window width is >= 1180px
        slidesPerView: 1.9, // сколько слайдов в активной области
        spaceBetween: 30, //расстояние между слайдами
      },
      900: {
        slidesPerView: 1.5, // сколько слайдов в активной области
        spaceBetween: 20, //расстояние между слайдами
      },
      740: {
        slidesPerView: 1.2, // сколько слайдов в активной области
        spaceBetween: 20, //расстояние между слайдами
      },
      680: {
        allowTouchMove: false, //запретить листать свайпом
      },
      500: {
        slidesPerView: 1.5, // сколько слайдов в активной области
        spaceBetween: 30, //расстояние между слайдами
      },
      400: {
        slidesPerView: 1.2, // сколько слайдов в активной области
      },
    }
  });
}


// Модальное окно checkbox
const modal = document.getElementById('modal');
const checkbox = document.getElementById('subscribe');
const confirmButton = document.getElementById('confirmButton');
const cancelButton = document.getElementById('cancelButton');

checkbox.checked = false; // по умолч при загрузке страницы выключен checkbox

const disablePageScroll = () => { // Функция для блокировки прокрутки фоновой страницы
  document.body.classList.add('modal-open');
}

const enablePageScroll = () => { // Функция для разблокировки прокрутки фоновой страницы
  document.body.classList.remove('modal-open');
}

checkbox.addEventListener('click', () => {
  modal.style.display = 'block'; // При клике на Checkbox, показываем модальное окно
  disablePageScroll(); //блокируем прокрутку фоновой страницы
});

confirmButton.addEventListener('click', () => {
  checkbox.checked = true; // Если пользователь подтвердил выбор, отмечаем Checkbox
  modal.style.display = 'none'; //и закрываем модальное окно
  enablePageScroll(); //разблокировка прокрутки фоновой страницы
});

cancelButton.addEventListener('click', () => {
  checkbox.checked = false; // Если пользователь отменил выбор, снимаем отметку с Checkbox
  modal.style.display = 'none'; //и закрываем модальное окно
  enablePageScroll(); //разблокировка прокрутки фоновой страницы
});


// Form согласие на обработку
const form = document.getElementById("form");
//const checkbox = document.getElementById("subscribe"); - объявлена выше
const submitButton = document.getElementById("submitButton");

checkbox.addEventListener("change", () => {
  // Если чекбокс отмечен, активируем кнопку submit, в противном случае делаем её неактивной
  submitButton.disabled = !checkbox.checked; //если чекбокс отмечен, то неактивную кнопку делаем активной!, если чекбокс неотмечен, то отставляем кнопку неактивной
});

form.addEventListener("submit", (event) => {
  if (!checkbox.checked) {
    event.preventDefault(); // Отменяем отправку формы, если чекбокс не отмечен
  }
});


//Форма изменение акцентного цвета
const color = document.getElementById('color');
const colorNumber = document.querySelector('.color');
const elementProp = document.querySelector('body');
color.addEventListener('change', () => {
  elementProp.style.setProperty('--accent-color', color.value); //изменяем переменную CSS
  colorNumber.innerHTML = color.value;
});