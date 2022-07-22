/* Variables //////////////////////////////////////// */

var navigation = document.querySelector("nav");
var logo = navigation.querySelector("#logo");
var menu = navigation.querySelector("#menu");
var categories = navigation.querySelector("ul");
var categoryButtons = navigation.querySelectorAll("ul > *");

var slides = document.querySelectorAll("section .dual-content .slider > *");

/* Initials //////////////////////////////////////// */

setInterval(slide, 5000);

/* Events //////////////////////////////////////// */

window.addEventListener("scroll", scrollCheck);

menu.addEventListener("click", toggleMenu);
categoryButtons.forEach(function (item) {
  item.addEventListener("click", toggleMenu);
});

/* Functions //////////////////////////////////////// */

function toggleMenu() {
  categories.classList.toggle("hidden");
}

function scrollCheck() {
  if (window.scrollY == 0) {
    navigation.classList.remove("smallNav");
    logo.classList.remove("smallLogo");
  } else {
    navigation.classList.add("smallNav");
    logo.classList.add("smallLogo");
  }
}

function slide() {
  for (let i = 0; i < slides.length; i++) {
    let item = slides[i];

    if (!item.classList.contains("faded")) {
      let nextItem = slides[(i + 1) % slides.length];
      let nextOtherItem = slides[(i + 2) % slides.length];

      item.classList.add("faded");
      item.classList.add("left");

      setTimeout(function () {
        nextItem.classList.remove("faded");
        nextItem.classList.remove("right");
      }, 300);

      setTimeout(function () {
        item.classList.remove("left");
        nextOtherItem.classList.add("right");
      }, 1000);

      break;
    }
  }
}
