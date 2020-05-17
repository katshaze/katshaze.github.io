// set up canvas
let windowWidth = window.innerWidth;
const container = document.querySelector(".container");
let scrollHeight = container.scrollHeight;

const canvas = document.getElementById("myCanvas");
let w = (canvas.width = windowWidth);
let h = (canvas.height = scrollHeight);

const ctx = canvas.getContext("2d");
const tileSize = 30;

const generateDiagonals = function (ctx, tileSize, w, h) {
  ctx.clearRect(0, 0, w, h);
  for (let y = 0; y <= h / tileSize; y++) {
    for (let x = 0; x <= w / tileSize; x++) {
      const leftToRight = Math.random() >= 0.5;
      const xOffset = x * tileSize;
      const yOffset = y * tileSize;
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${Math.floor(
        255 - (y + 1) * 2
      )}, 100, ${Math.floor(255 - (x + 1) * 15)}, 0.5)`;
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

const generateOverlapDiagonals = function (ctx, tileSize, w, h) {
  ctx.clearRect(0, 0, w, h);
  for (let y = 0; y <= h / tileSize; y++) {
    for (let x = 0; x <= w / tileSize; x++) {
      const leftToRight = Math.random() >= 0.5;
      const xOffset = x * tileSize;
      const yOffset = y * tileSize;
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${Math.floor(150 - y * 2)}, ${Math.floor(
        150 - x * 5
      )}, 150, 0.5)`;
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

const generateHorVertLines = function (ctx, tileSize, w, h) {
  ctx.clearRect(0, 0, w, h);
  for (let y = 0; y <= h / tileSize; y++) {
    for (let x = 0; x <= w / tileSize; x++) {
      const vertical = Math.random() >= 0.5;
      const xOffset = x * tileSize;
      const yOffset = y * tileSize;
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${Math.floor(150 - y * 2)}, ${Math.floor(
        200 - (x + 1) * 5
      )}, ${Math.floor(10 + y * 2)}, 0.5)`;

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

const randomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Determine which pattern to draw next
let nextUp = 2;

const drawNextUp = function () {
  if (nextUp === 1) {
    generateOverlapDiagonals(ctx, tileSize, w, h);
    // nextUp = 'b';
  } else if (nextUp === 2) {
    generateHorVertLines(ctx, tileSize, w, h);
    // nextUp = 'c';
  } else if (nextUp === 3) {
    generateDiagonals(ctx, tileSize, w, h);
  }

  let maybeNext = randomInteger(1, 3);
  while (maybeNext === nextUp) {
    maybeNext = randomInteger(1, 3);
  }
  nextUp = maybeNext;
};

export function generateBackground() {
  // generate pattern initially & on refresh
  generateDiagonals(ctx, tileSize, w, h);

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
    scrollHeight = container.scrollHeight;
    w = canvas.width = windowWidth;
    h = canvas.height = scrollHeight;
    generateHorVertLines(ctx, tileSize, w, h);
    nextUp = 3;
  };
}
