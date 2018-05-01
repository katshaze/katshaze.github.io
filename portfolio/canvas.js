$(document).ready(function() {

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const container = document.querySelector('.container');
  const scrollHeight = container.scrollHeight;
  console.log(scrollHeight);

  const canvas = document.getElementById('myCanvas');
  const w = canvas.width = windowWidth;
  const h = canvas.height = scrollHeight;

  const ctx = canvas.getContext('2d');
  const tileSize = 30;
  let nextUp = 'b';

  // getting a random integer:
  // function getRandomInt(min, max) {
  //     return Math.floor(Math.random() * (max - min + 1)) + min;
  // }

  function generateDiagonals(ctx, tileSize, w, h) {
   ctx.clearRect(0, 0, w, h);

    for (let y = 0; y <= (h / tileSize); y++) {
      for (let x = 0; x <= (w / tileSize); x++) {
        const leftToRight = Math.random() >= .5;
        const xOffset = x * tileSize;
        const yOffset = y * tileSize;

        ctx.beginPath();
        ctx.strokeStyle = `rgb(
                      ${Math.floor(255 - (y * 4))}, 70,
                      ${Math.floor(255 - (x * 20))})`;
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

    for (let y = 0; y <= (h / tileSize); y++) {
      for (let x = 0; x <= (w / tileSize); x++) {
        const leftToRight = Math.random() >= .5;
        const xOffset = x * tileSize;
        const yOffset = y * tileSize;

        ctx.beginPath();
        ctx.strokeStyle = `rgb(
                      ${Math.floor(255 - ((y + 1) * 5))}, 0,
                      ${Math.floor(255 - ((x + 1) * 20))})`;
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

    for (let y = 0; y <= (h / tileSize); y++) {
      for (let x = 0; x <= (w / tileSize); x++) {
        const vertical = Math.random() >= .5;
        const xOffset = x * tileSize;
        const yOffset = y * tileSize;

        ctx.beginPath();
        ctx.strokeStyle = `rgb(${Math.floor(255 - ((x + 1) * 5))},
        ${Math.floor(255 - ((y + 1) * 20))}, 0)`;
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
  $('body').add('a').on('click', function(){
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
      generateHorVertLines(ctx, tileSize, w, h);
      nextUp = 'a';
    }
  });

  $('a').on('click', function() {
    console.log('link tag was clicked');
  })
}); // end of doc ready
