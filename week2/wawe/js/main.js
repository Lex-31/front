$(function () {
  $('.slider-blog__inner').slick({
    dots: true,
    arrows: false,
  });

  //------header menu-------
  $('.menu__btn').on('click', function () {
    $('.menu__list').toggleClass('menu__list--active');
  });

  var mixer = mixitup('.gallery__content');

});