$(document).ready(function() {
  // scroll to sections
  $('#home-nav').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
    scrollTop: 0}, {duration: 1000, easing: 'linear'});
  });

  $('#foot-nav').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
    scrollTop: 0}, {duration: 1000, easing: 'linear'});
  });

  $('#about-nav').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $(".about").offset().top
    }, {duration: 1000, easing: 'linear'});
  });

  $('#intro-arrows').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $(".about").offset().top
    }, {duration: 1000, easing: 'linear'});
  });

  $('#projects-nav').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $(".projects").offset().top
    }, {duration: 1000, easing: 'linear'});
  });

  $('#about-arrows').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $(".projects").offset().top
    }, {duration: 1000, easing: 'linear'});
  });
});
