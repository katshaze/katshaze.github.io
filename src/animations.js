// generic scroll somewhere function
const scrollSomewhere = function (fromId, toId) {  
  document.getElementById(`${fromId}`).addEventListener("click", function (e) {
    // prevent it from updating the url
    e.preventDefault();
    document.getElementById(`${toId}`).scrollIntoView({ behavior: "smooth" });
  });
};

// function to start event listeners for scrolling
export function startScrollEventListeners() {
  // navigate home
  scrollSomewhere("home-nav", "home-anchor");
  // scroll up home from footer
  scrollSomewhere("foot-nav", "home-anchor");
  // navigate to about section
  scrollSomewhere("about-nav", "about-anchor");
  // scroll down from end of intro to about
  scrollSomewhere("intro-arrows", "about-anchor");
  // navigate to projects
  scrollSomewhere("projects-nav", "projects-anchor");
  // scroll down from end of about to projects
  scrollSomewhere("about-arrows", "projects-anchor");
};
