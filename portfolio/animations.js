$(document).ready(function() {
  // scroll to sections
  $('#home-nav').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
    scrollTop: 0}, 1000);
  })

  $('#about-nav').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $("#about-heading").offset().top - 60
    }, 1000);
  })

  $('#projects-nav').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $("#projects-heading").offset().top - 60
    }, 1000);
  })
});
