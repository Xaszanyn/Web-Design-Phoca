var navigation = document.querySelector("nav");
var logo = document.querySelector("#logo");

window.addEventListener("scroll", function () {
  if (window.scrollY == 0) {
    navigation.classList.remove("smallNav");
    logo.classList.remove("smallLogo");
  } else {
    navigation.classList.add("smallNav");
    logo.classList.add("smallLogo");
  }
});
