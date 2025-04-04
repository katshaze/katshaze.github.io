// set up canvas
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

const canvas = document.getElementById("myCanvas");
let w = (canvas.width = windowWidth);
let h = (canvas.height = windowHeight);

const ctx = canvas.getContext("2d");

// Constants
const TILE_SIZE = 30;
const TRANSPARENCY = 0.4;

const generateDiagonals = function (ctx, tileSize, w, h) {
  ctx.clearRect(0, 0, w, h);

  // Randomly determine gradient direction
  const gradientDirection = Math.floor(Math.random() * 2); // 0 = horizontal, 1 = vertical

  for (let y = 0; y <= h / tileSize; y++) {
    for (let x = 0; x <= w / tileSize; x++) {
      const leftToRight = Math.random() >= 0.5;
      const xOffset = x * tileSize;
      const yOffset = y * tileSize;

      ctx.beginPath();

      // Set the stroke style based on the gradient direction
      if (gradientDirection === 0) {
        // Horizontal gradient
        ctx.strokeStyle = `rgba(${Math.floor(255 - (x + 1) * 1)}, 100, ${Math.floor(
          255 - (x + 1) * 10
        )}, ${TRANSPARENCY})`;
      } else {
        // Vertical gradient
        ctx.strokeStyle = `rgba(${Math.floor(255 - (y + 1) * 1)}, 100, ${Math.floor(
          255 - (y + 1) * 10
        )}, ${TRANSPARENCY})`;
      }

      // Draw the diagonal lines
      if (leftToRight) {
        // draw left to right line = \
        ctx.moveTo(xOffset, yOffset);
        ctx.lineTo(xOffset + tileSize, yOffset + tileSize);
      } else {
        // draw right to left line = /
        ctx.moveTo(xOffset + tileSize, yOffset);
        ctx.lineTo(xOffset, yOffset + tileSize);
      }
      ctx.stroke();
    }
  }
};

const generateOverlapDiagonals = function (ctx, tileSize, w, h) {
  ctx.clearRect(0, 0, w, h);
  // Randomly determine gradient direction
  const gradientDirection = Math.floor(Math.random() * 2); // 0 = horizontal, 1 = vertical

  for (let y = 0; y <= h / tileSize; y++) {
    for (let x = 0; x <= w / tileSize; x++) {
      const leftToRight = Math.random() >= 0.5;
      const xOffset = x * tileSize;
      const yOffset = y * tileSize;

      ctx.beginPath();

      // Set the stroke style based on the gradient direction
      if (gradientDirection === 0) {
        ctx.strokeStyle = `rgba(${Math.floor(150 - x * 2)}, ${Math.floor(
          150 - x * 5
        )}, 150, ${TRANSPARENCY})`;
      } else {
        ctx.strokeStyle = `rgba(${Math.floor(150 - y * 2)}, ${Math.floor(
          150 - y * 5
        )}, 150, ${TRANSPARENCY})`;
      }

      // Draw the overlapped diagonal lines
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

const randomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Determine which pattern to draw next
let nextUp = 2;

const drawNextUp = function () {
  if (nextUp === 1) {
    generateOverlapDiagonals(ctx, TILE_SIZE, w, h);
  } else {
    generateDiagonals(ctx, TILE_SIZE, w, h);
  }

  let maybeNext = randomInteger(1, 2);
  while (maybeNext === nextUp) {
    maybeNext = randomInteger(1, 2);
  }
  nextUp = maybeNext;
};

export function generateBackground() {
  // generate pattern initially & on refresh
  generateDiagonals(ctx, TILE_SIZE, w, h);

  // generate new pattern at random on click
  const clickableElements = document.querySelectorAll("body, a");
  for (let i = 0; i < clickableElements.length; i++) {
    addEventListener("click", function () {
      drawNextUp();
    });
  }

  // regenerate one of the patterns if window is resized
  window.onresize = function () {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    w = canvas.width = windowWidth;
    h = canvas.height = windowHeight;
    generateDiagonals(ctx, TILE_SIZE, w, h);
    nextUp = 2;
  };
}
