$(function () {

  $('.menu__btn').on('click', function () {
    $('.menu__list').toggleClass('menu__list--active');
  }); //верхнее меню бургер

  $('.shop__filter-btn').on('click', function () {
    $('.shop__filters').slideToggle();
  }); //открытие-закрытие фильтров

  $('.blog-page__slider').slick({
    prevArrow: '<button type="button" class="slick-prev"><svg width="9px" height="14px" viewBox="0 0 9 14" version="1.1"><g><path d="M 1.164062 6.382812 C 0.8125 6.722656 0.8125 7.277344 1.164062 7.621094 L 5.664062 11.996094 C 6.015625 12.335938 6.585938 12.335938 6.9375 11.996094 C 7.289062 11.652344 7.289062 11.097656 6.9375 10.757812 L 3.074219 7 L 6.9375 3.242188 C 7.289062 2.902344 7.289062 2.347656 6.9375 2.003906 C 6.585938 1.664062 6.011719 1.664062 5.660156 2.003906 L 1.160156 6.378906 Z M 1.164062 6.382812 "/></g></svg></button>',
    nextArrow: '<button type="button" class="slick-next"><svg width="9px" height="14px" viewBox="0 0 9 14" version="1.1"><g><path d="M 7.835938 6.382812 C 8.1875 6.722656 8.1875 7.277344 7.835938 7.621094 L 3.335938 11.996094 C 2.984375 12.335938 2.414062 12.335938 2.0625 11.996094 C 1.710938 11.652344 1.710938 11.097656 2.0625 10.757812 L 5.925781 7 L 2.0625 3.242188 C 1.710938 2.902344 1.710938 2.347656 2.0625 2.003906 C 2.414062 1.664062 2.988281 1.664062 3.339844 2.003906 L 7.839844 6.378906 Z M 7.835938 6.382812 "/></g></svg></button>',
    infinite: false, //сделать ленту слайдеров конечной, без повторов
  });

  $('.product-tabs__top-item').on('click', function (e) { //переключение вкладок, связываем табы с вкладками
    e.preventDefault(); //отменяем стандартое действие при клике по ссылке
    $('.product-tabs__top-item').removeClass('product-tabs__top-item--active');
    $(this).addClass('product-tabs__top-item--active');

    $('.product-tabs__content-item').removeClass('product-tabs__content-item--active');
    $($(this).attr('href')).addClass('product-tabs__content-item--active');
  })

  $('.product-slide__thumb').slick({ //список превью слайдов
    asNavFor: '.product-slide__big', //связываем два слайдера
    focusOnSelect: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true,
    draggable: false,
  });
  $('.product-slide__big').slick({ //большая картинка слайда
    asNavFor: '.product-slide__thumb', //связываем два слайдера
    draggable: false, //запретить изменение свайпом
    arrows: false,
    fade: true,
    responsive: [
      {
        breakpoint: 1051,
        settings: {
          draggable: true, //разрешить изменение свайпом
        }
      },
    ],
  });

  $('.shop-content__filter-btn').on('click', function () {
    $('.shop-content__filter-btn').removeClass('shop-content__filter-btn--active');
    $(this).addClass('shop-content__filter-btn--active');
  });  //по клику изменяем цвет иконки сортировки по сетке или по линии

  $('.button-list').on('click', function () {
    $('.product-item').addClass('product-item--list');
    $('.shop-content__inner').addClass('shop-content__nogrid');
  });
  $('.button-grid').on('click', function () {
    $('.product-item').removeClass('product-item--list');
    $('.shop-content__inner').removeClass('shop-content__nogrid');
  });

  $('.select-style, .product-one__item-num').styler();  //стилизация тега select

  $('.filter-price__input').ionRangeSlider( //ползунок-фильтр цены
    {
      type: "double", //возможность выставлять min и max
      hide_from_to: true, //скрыть надписи
      hide_min_max: true, //скрыть надписи
      onStart: function (data) {  //функция при открытии стр записывает цены в нужные html элементы
        $('.filter-price__from').text(data.from);
        $('.filter-price__to').text(data.to);
      },
      onChange: function (data) {  //записывает цены в html элементы при изменении положения ползунка
        $('.filter-price__from').text(data.from);
        $('.filter-price__to').text(data.to);
      },
    }
  );

  $('.top-slider__inner').slick({
    dots: true, //включаем точки для перекл на слайдеры
    arrows: false, //отклбчем стрелочки переключения слайдеров
    fade: true, //плавная смена слайдеров без перемотки
    autoplay: true,  //автоматическая смена слайдеров
    autoplaySpeed: 2000  //время смены слайдов
  });

  $(".star").rateYo({
    readOnly: true, //запретить изменение рейтинга
    starWidth: "17px", //ширина 1 звездочки
    normalFill: "#ccccce", //цвет незакрашеных звездочек
    ratedFill: "#ffc35b", //цвет закрашенных звездочек
    starSvg: '<svg width="18px" height="16px" viewBox="0 0 18 16" version="1.1"><g><path style="stroke:none; fill-rule:nonzero;  fill-opacity:1;" d="M 9.902344 0.5625 C 9.738281 0.21875 9.386719 0 9.003906 0 C 8.617188 0 8.273438 0.21875 8.101562 0.5625 L 6.09375 4.695312 L 1.605469 5.359375 C 1.230469 5.414062 0.917969 5.679688 0.804688 6.039062 C 0.6875 6.398438 0.78125 6.792969 1.050781 7.058594 L 4.304688 10.28125 L 3.539062 14.835938 C 3.476562 15.210938 3.632812 15.589844 3.941406 15.8125 C 4.25 16.035156 4.660156 16.0625 4.996094 15.882812 L 9.007812 13.742188 L 13.015625 15.882812 C 13.351562 16.0625 13.761719 16.039062 14.070312 15.8125 C 14.382812 15.585938 14.539062 15.210938 14.476562 14.835938 L 13.703125 10.28125 L 16.960938 7.058594 C 17.226562 6.792969 17.324219 6.398438 17.207031 6.039062 C 17.085938 5.679688 16.777344 5.414062 16.402344 5.359375 L 11.914062 4.695312 Z M 9.902344 0.5625" /></g></svg >', //эскиз звезды
  });

  function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function initializeClock(id, endtime) {
    var clock = document.querySelector(id);
    var daysSpan = clock.querySelector('.promo__days');
    var hoursSpan = clock.querySelector('.promo__hours');
    var minutesSpan = clock.querySelector('.promo__minutes');
    var secondsSpan = clock.querySelector('.promo__seconds');

    function updateClock() {
      var t = getTimeRemaining(endtime);

      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
  }

  // var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
  // var deadline = '2023-01-08';
  var deadline = $('.promo__clock').attr('data-time');
  initializeClock('.promo__clock', deadline);

});