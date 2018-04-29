$(document).ready(function() {

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const canvas = document.getElementById('myCanvas');
  console.log(canvas);
  canvas.width = windowWidth;
  // canvas.height = windowWidth / 2;
  canvas.height = windowHeight;

  const context = canvas.getContext('2d');
  const tileSize = 30;

  // getting a random integer:
  // function getRandomInt(min, max) {
  //     return Math.floor(Math.random() * (max - min + 1)) + min;
  // }

  function generateDiagonals(ctx, tileSize, width, height) {
   ctx.clearRect(0, 0, width, height);

    for (let y = 0; y <= (height / tileSize); y++) {
      for (let x = 0; x <= (width / tileSize); x++) {
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

  function generateOverlapDiagonals(ctx, tileSize, width, height) {
   ctx.clearRect(0, 0, width, height);

    for (let y = 0; y <= (height / tileSize); y++) {
      for (let x = 0; x <= (width / tileSize); x++) {
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
          ctx.moveTo(xOffset, yOffset);
          ctx.lineTo(xOffset - tileSize, yOffset + tileSize);
        }

        ctx.stroke();
      }
    }
  }

  function generateHorVertLines(ctx, tileSize, width, height) {
   ctx.clearRect(0, 0, width, height);

    for (let y = 0; y <= (height / tileSize); y++) {
      for (let x = 0; x <= (width / tileSize); x++) {
        const vertical = Math.random() >= .5;
        const xOffset = x * tileSize;
        const yOffset = y * tileSize;

        ctx.beginPath();
        ctx.strokeStyle = `rgb(${Math.floor(255 - (x * 4))}, 70, ${Math.floor(255 - (y * 20))})`;
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

  generateOverlapDiagonals(context, tileSize, canvas.width, canvas.height);

  // do it againnnnnn at random
  canvas.addEventListener("click", function(){
    const diagonals = Math.random() <= .5;
    if (diagonals) {
      generateOverlapDiagonals(context, tileSize, canvas.width, canvas.height);
    } else {
      generateHorVertLines(context, tileSize, canvas.width, canvas.height);
    }
  });

}); // end of doc ready
