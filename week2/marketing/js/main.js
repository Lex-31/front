$(function () {

  $(".menu a, .go-top").on("click", function (e) { //.menu a, .go-top - ссылки якорные с такими классами будут плавно скроллить
    e.preventDefault(); //отменяем стандартную обработку нажатия по ссылке
    var id = $(this).attr('href'), //забираем идентификатор бока с атрибута href

      top = $(id).offset().top; //узнаем высоту от начала страницы до блока на который ссылается якорь

    $('body,html').animate({ scrollTop: top }, 1500); //анимируем переход на расстояние - top за 1500 мс
  });

  $('.slider-blog__inner').slick({
    dots: true,
    prevArrow: '<button type="button" class="slick-prev"><img src="images/arrow-left.svg" alt="arrow left"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="images/arrow-right.svg" alt="arrow right"></button>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        }
      },
    ]
  });

  //------header menu------- открывать/закрывать меню на мобильнй версии
  $('.menu__btn, .menu a').on('click', function () {
    $('.header__top-inner').toggleClass('header__top-inner--active'); //при нажатии кнопки .menu__btn будет меняться класс менюшки, при нажатии кнопки ".menu a" будет скрываться менюшка
  });

  var mixer = mixitup('.portfolio__content');

});
