$(function () {

  $('.mavic').hover(
    function () {
      $('.mavic-img').addClass('mavic-on').removeClass('mavic-off');
      $('.mavic').addClass('animation-on').removeClass('animation-off');
    },
    function () {
      $('.mavic-img').removeClass('mavic-on').addClass('mavic-off');
      $('.mavic').removeClass('animation-on').addClass('animation-off');
    }
  );

});