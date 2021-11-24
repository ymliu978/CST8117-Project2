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
