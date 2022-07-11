/* Variables //////////////////////////////////////// */

var navigation = document.querySelector("nav");
var logo = navigation.querySelector("#logo");
var menu = navigation.querySelector("#menu");
var categories = navigation.querySelector("nav ul");
var categoryButtons = navigation.querySelectorAll("nav ul > *");

/* Event //////////////////////////////////////// */

window.addEventListener("scroll", scrollCheck);

menu.addEventListener("click", toggleMenu);
categoryButtons.forEach(function (item) {
  item.addEventListener("click", toggleMenu);
});

/* Function //////////////////////////////////////// */

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

alert("version control");
