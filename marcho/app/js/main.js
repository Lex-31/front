$(function () {
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
    ratedFill: "#ffc35b" //цвет закрашенных звездочек
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