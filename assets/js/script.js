/* Created by Ekin Aslan ekinaslan.js@gmail.com */

// ================================================== VARIABLES ================================================== //

const mobile = document.querySelector("#mobile");
const fish = document.querySelector("#mobile #fish");
const seaTurtle = document.querySelector("#mobile #sea-turtle");
const octopus = document.querySelector("#mobile #octopus");
const navigation = document.querySelector("#mobile nav");
const bar = document.querySelector("#mobile #bar");
const menu = document.querySelector("#mobile #menu");

const desktop = document.querySelector("#desktop");
const desktopNavigation = document.querySelector("#desktop nav");
const logo = desktopNavigation.querySelector("#desktop #logo");
const slides = document.querySelectorAll("#desktop section .dual-content .slider > *");
const header = document.querySelector("#desktop header");
var desktopBackground = 0;

const termsOfUse = document.querySelectorAll(".terms-of-use");
const privacyPolicy = document.querySelectorAll(".privacy-policy");
const partnerPolicies = document.querySelectorAll(".partner-policies");
const termsAndPolicies = document.querySelector("#terms-and-policies");
const termsAndPoliciesParts = document.querySelectorAll("#terms-and-policies div");
const termsAndPoliciesClose = document.querySelector("#terms-and-policies-close");

const colorInterpolation = [
  [45, 102, 115, 0], // var(--background-primary)
  [21, 87, 95, 15],
  [12, 82, 129, 40],
  [108, 40, 161, 80],
  [19, 21, 71, 100],
];

var ratio = 0;
var unit = 0;

var isDesktop = window.innerWidth > window.innerHeight;

// ================================================== EVENTS ================================================== //

window.addEventListener("resize", makeResponsive);

window.addEventListener("scroll", function () {
  if (isDesktop) {
    scrollCheck();
    return;
  }

  transparentNavigation(window.scrollY);

  let backgroundImageHeight = window.innerWidth * 2;

  let scrollRatio = Math.ceil(
    (Math.max(0, window.scrollY - backgroundImageHeight) /
      (document.body.offsetHeight - window.innerHeight - backgroundImageHeight)) *
      100
  );

  let scrollUnit = Math.ceil((window.scrollY / window.innerWidth) * 20);

  if (ratio != scrollRatio) {
    ratio = scrollRatio;
    backgroundInterpolation();
  }

  if (unit != scrollUnit) {
    unit = scrollUnit;
    objectPerspective(unit);
  }
});

bar.addEventListener("click", function (event) {
  event.preventDefault();

  menu.classList.add("displayed");
});

menu.addEventListener("mousedown", function (event) {
  menu.classList.remove("displayed");
});

termsOfUse.forEach((button) =>
  button.addEventListener("mousedown", function (event) {
    event.preventDefault();

    termsAndPolicies.classList.add("active");
    termsAndPoliciesParts[0].classList.add("active");
  })
);

privacyPolicy.forEach((button) =>
  button.addEventListener("mousedown", function (event) {
    event.preventDefault();

    termsAndPolicies.classList.add("active");
    termsAndPoliciesParts[1].classList.add("active");
  })
);

partnerPolicies.forEach((button) =>
  button.addEventListener("mousedown", function (event) {
    event.preventDefault();

    termsAndPolicies.classList.add("active");
    termsAndPoliciesParts[2].classList.add("active");
  })
);

termsAndPoliciesClose.addEventListener("mousedown", function (event) {
  event.preventDefault();

  termsAndPolicies.classList.remove("active");
  termsAndPoliciesParts.forEach((part) => part.classList.remove("active"));
});

// ================================================== FUNCTIONS ================================================== //

function makeResponsive() {
  isDesktop = window.innerWidth > window.innerHeight;
  if (isDesktop) {
    mobile.style.display = "none";
    desktop.style.display = "block";
  } else {
    mobile.style.display = "block";
    desktop.style.display = "none";
  }
}

function backgroundInterpolation() {
  if (ratio < 0) return;

  for (let i = 1; i < colorInterpolation.length; i++) {
    let end = colorInterpolation[i];
    if (ratio <= end[3]) {
      let start = colorInterpolation[i - 1];

      let interpolation = (ratio - start[3]) / (end[3] - start[3]);

      let red = start[0] + (end[0] - start[0]) * interpolation;
      let green = start[1] + (end[1] - start[1]) * interpolation;
      let blue = start[2] + (end[2] - start[2]) * interpolation;

      mobile.style = `background-color: rgb(${red}, ${green}, ${blue})`;

      break;
    }
  }
}

function objectPerspective(unit) {
  fish.style.transform = `translateY(-${Math.min(unit * 5, 150)}px)`;

  seaTurtle.style.transform =
    unit * 3 - 210 > 0
      ? `translateY(-${Math.min(unit * 3 - 210, 30)}px)`
      : `translateY(${Math.min((unit * 3 - 210) * -1, 150)}px)`;

  octopus.style.transform = `scale(1.35) translateY(${Math.min(Math.max(unit * 2 - 175, -30), 120)}px)`;
}

function transparentNavigation(y) {
  if (y == 0) navigation.classList.remove("opened");
  else navigation.classList.add("opened");
}

function displayGameImages() {
  document.querySelectorAll(".game-image").forEach((gameImage) => {
    setInterval(() => {
      if (gameImage.children[1].classList.contains("hidden")) {
        gameImage.children[1].classList.remove("hidden");
      } else gameImage.children[1].classList.add("hidden");
    }, 3000);
  });
}

function scrollCheck() {
  if (window.scrollY == 0) {
    desktopNavigation.classList.remove("smallNav");
    logo.classList.remove("smallLogo");
  } else {
    desktopNavigation.classList.add("smallNav");
    logo.classList.add("smallLogo");
  }
}

// ================================================== INITIALIZE ================================================== //

displayGameImages();

makeResponsive();

setInterval(function () {
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
}, 6000);

header.classList.add("bottom");
setInterval(function () {
  header.classList.toggle("bottom");
}, 45000);
