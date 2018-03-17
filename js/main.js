const cat = document.querySelector('img');
cat.style.position = "absolute";
cat.style.left = "0px";

//>>>>>>>>>> Cat goes L to R then R to L when gets to end <<<<<<<<<<<<<<<<<

let catWalkLR = function() {
  cat.className = "";
  let oldPos = parseInt(cat.style.left);
  let newPos = oldPos + 5;
  cat.style.left = `${newPos}px`;

  if (newPos > window.innerWidth - 296) {  // could use === for e.g. 1200 coz multiple of 10, but for window, not necessarily multiple of 10, therefore use greater than. minus the width of cat so doesn't go past screen
    clearInterval(timerID);
    timerID = setInterval(catWalkRL, 20);
    }
}

const catWalkRL = function() {
  cat.className = 'reverseCat';
  let oldPos = parseInt(cat.style.left);
  let newPos = oldPos - 5;
  cat.style.left = `${newPos}px`;

  if (newPos < 0) {
    clearInterval(timerID);
    timerID = setInterval(catWalkLR, 20);
  }
}

var timerID = window.setInterval(catWalkLR, 20);
