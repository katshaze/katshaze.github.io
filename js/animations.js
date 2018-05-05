$(document).ready(function() {
  // scroll to sections
  $('#home-nav').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
    scrollTop: 0}, 1000);
  });

  $('#foot-nav').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
    scrollTop: 0}, 1000);
  });

  $('#about-nav').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $(".about").offset().top
    }, 1000);
  });

  $('#intro-arrows').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $(".about").offset().top
    }, 1000);
  });

  $('#projects-nav').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $(".projects").offset().top
    }, 1000);
  });

  $('#about-arrows').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $(".projects").offset().top
    }, 1000);
  });
});
