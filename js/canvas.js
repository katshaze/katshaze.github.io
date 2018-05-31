'use strict';

$(document).ready(function () {

  // canvas
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var container = document.querySelector('.container');
  var scrollHeight = container.scrollHeight;

  var canvas = document.getElementById('myCanvas');
  var w = canvas.width = windowWidth;
  var h = canvas.height = scrollHeight;

  // let w, h;
  // const sizeCanvas = function() {
  //   w = canvas.width = windowWidth;
  //   h = canvas.height = scrollHeight;
  //   console.log('sizeCanvas function triggered. width & height are:', w, h);
  // }
  // sizeCanvas();
  // $(window).resize(function() {
  //   console.log(`window resized`);
  //   sizeCanvas()
  // });

  // const w = canvas.width = windowWidth;
  // const h = canvas.height = scrollHeight;

  var ctx = canvas.getContext('2d');
  var tileSize = 30;
  var nextUp = 'b';

  // getting a random integer:
  // function getRandomInt(min, max) {
  //     return Math.floor(Math.random() * (max - min + 1)) + min;
  // }

  function generateDiagonals(ctx, tileSize, w, h) {
    ctx.clearRect(0, 0, w, h);

    for (var y = 0; y <= h / tileSize; y++) {
      for (var x = 0; x <= w / tileSize; x++) {
        var leftToRight = Math.random() >= .5;
        var xOffset = x * tileSize;
        var yOffset = y * tileSize;

        ctx.beginPath();
        ctx.strokeStyle = 'rgb(' + Math.floor(255 - (y + 1) * 2) + ', 0, ' + Math.floor(255 - (x + 1) * 15) + ')';
        if (leftToRight) {
          // draw  left to right line = \
          ctx.moveTo(xOffset, yOffset);
          ctx.lineTo(xOffset + tileSize, yOffset + tileSize);
        } else {
          // draw  right to left line = /
          ctx.moveTo(xOffset + tileSize, yOffset);
          ctx.lineTo(xOffset, yOffset + tileSize);
        }

        ctx.stroke();
      }
    }
  }

  function generateOverlapDiagonals(ctx, tileSize, w, h) {
    ctx.clearRect(0, 0, w, h);

    for (var y = 0; y <= h / tileSize; y++) {
      for (var x = 0; x <= w / tileSize; x++) {
        var leftToRight = Math.random() >= .5;
        var xOffset = x * tileSize;
        var yOffset = y * tileSize;

        ctx.beginPath();
        ctx.strokeStyle = 'rgb(' + Math.floor(255 - y * 4) + ', 150, ' + Math.floor(255 - x * 20) + ')';
        if (leftToRight) {
          // draw  left to right line = \
          ctx.moveTo(xOffset, yOffset);
          ctx.lineTo(xOffset + tileSize, yOffset + tileSize);
        } else {
          // draw  right to left line = /
          ctx.moveTo(xOffset, yOffset);
          ctx.lineTo(xOffset - tileSize, yOffset + tileSize);
        }

        ctx.stroke();
      }
    }
  }

  function generateHorVertLines(ctx, tileSize, w, h) {
    ctx.clearRect(0, 0, w, h);

    for (var y = 0; y <= h / tileSize; y++) {
      for (var x = 0; x <= w / tileSize; x++) {
        var vertical = Math.random() >= .5;
        var xOffset = x * tileSize;
        var yOffset = y * tileSize;

        ctx.beginPath();
        ctx.strokeStyle = 'rgb(' + Math.floor(255 - (x + 1) * 5) + ', ' + Math.floor(255 - (y + 1) * 5) + ', 0)';
        if (vertical) {
          // draw vertical line = |
          ctx.moveTo(xOffset, yOffset);
          ctx.lineTo(xOffset, yOffset + tileSize);
        } else {
          // draw horizontal line = --
          ctx.moveTo(xOffset, yOffset);
          ctx.lineTo(xOffset + tileSize, yOffset);
        }

        ctx.stroke();
      }
    }
  }

  function generateHorVertLines2(ctx, tileSize, w, h) {
    ctx.clearRect(0, 0, w, h);

    for (var y = 0; y <= h / tileSize; y++) {
      for (var x = 0; x <= w / tileSize; x++) {
        var vertical = Math.random() >= .5;
        var xOffset = x * tileSize;
        var yOffset = y * tileSize;

        ctx.beginPath();
        ctx.strokeStyle = 'rgb(30,\n        ' + Math.floor(255 - (y + 1) * 5) + ', ' + Math.floor(255 - (x + 1) * 5) + ')';
        if (vertical) {
          // draw vertical line = |
          ctx.moveTo(xOffset, yOffset);
          ctx.lineTo(xOffset, yOffset + tileSize);
        } else {
          // draw horizontal line = --
          ctx.moveTo(xOffset, yOffset);
          ctx.lineTo(xOffset + tileSize, yOffset);
        }

        ctx.stroke();
      }
    }
  }

  // generate pattern initially & on refresh
  generateOverlapDiagonals(ctx, tileSize, w, h);

  // do it againnnnnn on each click, alternating
  $('body, a').on('click', function () {
    if (nextUp === 'a') {
      generateOverlapDiagonals(ctx, tileSize, w, h);
      nextUp = 'b';
    } else if (nextUp === 'b') {
      generateHorVertLines(ctx, tileSize, w, h);
      nextUp = 'c';
    } else if (nextUp === 'c') {
      generateDiagonals(ctx, tileSize, w, h);
      nextUp = 'd';
    } else if (nextUp === 'd') {
      generateHorVertLines2(ctx, tileSize, w, h);
      nextUp = 'a';
    }
  });

  $(window).resize(function () {
    console.log('resize fired');
    windowWidth = window.innerWidth;
    scrollHeight = container.scrollHeight;
    w = canvas.width = windowWidth;
    h = canvas.height = scrollHeight;
    generateHorVertLines(ctx, tileSize, w, h);
    nextUp = 'c';
  });
}); // end of doc ready