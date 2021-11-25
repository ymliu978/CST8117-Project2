var header = document.querySelector("#header");
var responsiveMenuOpen = document.querySelector("#responsive-menu-open");
var responsiveMenuClose = document.querySelector("#overlay-menu-close");
var responsiveMenuOverlay = document.querySelector(".responsive-menu-overlay");

window.addEventListener("scroll", function () {
    if (window.scrollY === 0) {
        // remove background styling from header
        header.classList.remove("header-scroll");
    } else if (window.scrollY > 32) {
        // add background styling to header
        header.classList.add("header-scroll");
    }
});

responsiveMenuOpen.addEventListener("click", function () {
    // add background styling to header
    header.classList.add("header-scroll");
    // open responsive overlay menu open button
    responsiveMenuOverlay.style.height = "calc(100% - 64px)";
    // stop body scroll
    document.body.style.overflow = "hidden";
    // hide overlay menu open button
    responsiveMenuOpen.style.display = "none";
    // show overlay menu close button
    responsiveMenuClose.style.display = "block";
});

responsiveMenuClose.addEventListener("click", function () {
    if (window.scrollY === 0) {
        // remove background styling from header
        header.classList.remove("header-scroll");
    }
    // close responsive overlay
    responsiveMenuOverlay.style.height = "0";
    // reset body scroll
    document.body.style.overflow = "auto";
    // hide overlay menu close button
    responsiveMenuClose.style.display = "none";
    // show overlay menu open button
    responsiveMenuOpen.style.display = "block";
});

// hide responsive menu when viewport width is greater than 768px (for desktop)
window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
        responsiveMenuOpen.style.display = "none";
        responsiveMenuClose.style.display = "none";
        // close responsive overlay
        responsiveMenuOverlay.style.height = "0";
        // reset body scroll
        document.body.style.overflow = "auto";
    } else {
        responsiveMenuOpen.style.display = "block";
    }
});

/*******************************************************************************
              Global user experience functionality. (ie. dark mode)
 *******************************************************************************/

// Getting all the user option buttons.
var uxButtons = document.querySelectorAll("div[class='features']");

// Getting both the non responsive and responsive theme toggle buttons.
let themeToggleButtons = [uxButtons[0].children[0], uxButtons[1].children[0]];

// Getting both the non responsive and responsive language buttons.
let languageToggleButtons = [uxButtons[0].children[1], uxButtons[1].children[1]]; // Toggle for language.

/*****************************
    Dark mode functionality.
 *****************************/

// Adding the CSS for the themes.
let themeStyles = document.createElement("style");
themeStyles.innerHTML = ".dark-mode-heading { border: 1px solid rgb(226, 226, 226); color: rgb(226, 226, 226); } .dark-mode-text { color: rgb(226, 226, 226); }";
document.querySelector("head").appendChild(themeStyles);

/*
Checking if the theme was last set to dark. If it was, it will update the theme to be dark. If it was light,
it doesn't have to do anything because the default class styles are already dark.

Also checks if the theme is undefined, because if it is, it means the theme is light, as it's the user's
first time on the page.
*/
if (localStorage.theme == "dark") {
    enableDarkTheme();
} else if (localStorage.theme == undefined) {
    localStorage.theme = "light";
}

// Event listener to make each of the theme toggle buttons work (both responsive and non responsive).
themeToggleButtons.forEach((button) => {
    button.addEventListener("click", function() {
        // If the theme is light theme...
        if (localStorage.theme == "light") {
            // Set the theme to dark theme.
            enableDarkTheme();
        // If the theme is dark theme...
        } else {
            // Set the theme to light theme.
            enableLightTheme();
        }
    });
});

// Enable light theme.
function enableLightTheme() {
    // Updating the theme reference to light.
    localStorage.theme = "light";
    // Setting the body background to white.
    document.body.style.backgroundColor = "white";
    // Setting both of the corresponding buttons to black (for contrast).
    themeToggleButtons.forEach((button) => {
        button.style.color = 'white';
    });
    // Setting the textinfo-headings to light mode.
    document.querySelectorAll("div[class='textinfo-heading dark-mode-heading']").forEach((heading) => {
        Array.from(heading.parentNode.children).forEach((child) => {
            child.classList == "textinfo-heading dark-mode-heading" ? child.classList = "textinfo-heading" : child.removeAttribute("class");
        });
    });
}

// Enable dark theme.
function enableDarkTheme() {
    // Updating the theme reference to dark.
    localStorage.theme = "dark";
    // Setting the body background to black.
    document.body.style.backgroundColor = "black";
    // Setting both of the corresponding buttons to black.
    themeToggleButtons.forEach((button) => {
        button.style.color = 'black';
    });
    // Setting the textinfo-headings to white (for contrast).
    document.querySelectorAll("div[class='textinfo-heading']").forEach((heading) => {
        Array.from(heading.parentNode.children).forEach((child) => {
            child.classList == "textinfo-heading" ? child.classList = "textinfo-heading dark-mode-heading" : child.classList = "dark-mode-text";
        });
    });
}