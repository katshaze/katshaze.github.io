let nextUp = 2;

$(document).ready(function() {

  // canvas
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  const container = document.querySelector('.container');
  let scrollHeight = container.scrollHeight;

  const canvas = document.getElementById('myCanvas');
  let w = canvas.width = windowWidth;
  let h = canvas.height = scrollHeight;

  const ctx = canvas.getContext('2d');
  const tileSize = 30;

  function generateDiagonals(ctx, tileSize, w, h) {
    ctx.clearRect(0, 0, w, h);
    for (let y = 0; y <= (h / tileSize); y++) {
      for (let x = 0; x <= (w / tileSize); x++) {
        const leftToRight = Math.random() >= .5;
        const xOffset = x * tileSize;
        const yOffset = y * tileSize;
        ctx.beginPath();
        ctx.strokeStyle = `rgb(${Math.floor(255 - ((y + 1) * 2))}, 100, ${Math.floor(255 - ((x + 1) * 15))})`;
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
  };

  function generateOverlapDiagonals(ctx, tileSize, w, h) {
    ctx.clearRect(0, 0, w, h);
    for (let y = 0; y <= (h / tileSize); y++) {
      for (let x = 0; x <= (w / tileSize); x++) {
        const leftToRight = Math.random() >= .5;
        const xOffset = x * tileSize;
        const yOffset = y * tileSize;
        ctx.beginPath();
        ctx.strokeStyle = `rgb(${Math.floor(255 - (y * 4))}, 150, ${Math.floor(255 - (x * 20))})`;
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
  };

  function generateHorVertLines(ctx, tileSize, w, h) {
    ctx.clearRect(0, 0, w, h);
    for (let y = 0; y <= (h / tileSize); y++) {
      for (let x = 0; x <= (w / tileSize); x++) {
        const vertical = Math.random() >= .5;
        const xOffset = x * tileSize;
        const yOffset = y * tileSize;
        ctx.beginPath();
        ctx.strokeStyle = `rgb(${Math.floor(255 - ((x + 1) * 5))}, ${Math.floor(255 - ((y + 1) * 5))}, 0)`;
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
  };

  // generate pattern initially & on refresh
  generateOverlapDiagonals(ctx, tileSize, w, h);

  // define function for which pattern to draw next
  function drawNextUp() {
    console.log(`nextUp before running maybeNext:`, nextUp);
    if (nextUp === 1) {
      generateOverlapDiagonals(ctx, tileSize, w, h);
      // nextUp = 'b';
    } else if (nextUp === 2) {
      generateHorVertLines(ctx, tileSize, w, h);
      // nextUp = 'c';
    } else if (nextUp === 3) {
      generateDiagonals(ctx, tileSize, w, h);
    }

    let maybeNext = random(1,3);
    while (maybeNext === nextUp) {
      maybeNext = random(1,3);
    }
    nextUp = maybeNext;
  };

  // do it againnnnnn on each click, alternating
  $('body, a').on('click', function(){
    drawNextUp();
  });

  $(window).resize(function() {
    windowWidth = window.innerWidth;
    scrollHeight = container.scrollHeight;
    w = canvas.width = windowWidth;
    h = canvas.height = scrollHeight;
    generateHorVertLines(ctx, tileSize, w, h);
    nextUp = 3;
  });

}); // end of doc ready

const random = function(min,max) {
  // getting a random integer:
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
