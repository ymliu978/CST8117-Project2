var languageData = {
    navigation: {
        menu: {
            en: ["home", "about", "reservation", "menu"],
            fr: ["domicile", "À propos", "réservation", "menu"],
        },
    },
    home: {
        content: {
            en: [
                ["hours", "Tuesday - Sunday", "11AM - 10PM"],
                ["address", "70 Grand Ave", "Brooklyn, New York"],
                ["contact", "917-111-2222", "info@peterlogan.com"],
            ],
            fr: [
                ["les heures", "Mardi - Dimanche", "11h - 22h"],
                ["adresse", "70, Avenue Grand", "Brooklyn, New York"],
                ["contact", "917-111-2222", "info@peterlogan.com"],
            ],
        },
    },
    footer: {
        address: {
            en: "70 Grand Ave, Brooklyn, New York",
            fr: "70 Avenue Grand, Brooklyn, New York",
        },
        copyright: {
            en: "DESIGN BY YML",
            fr: "CONCEPTION PAR YML",
        },
        company: {
            en: "PETER LOGAN'S STEAK HOUSE",
            fr: "STEAK HOUSE DE PETER LOGAN",
        },
    },
};

var header = document.querySelector("#header");
var responsiveMenuOpen = document.querySelector("#responsive-menu-open");
var responsiveMenuClose = document.querySelector("#overlay-menu-close");
var responsiveMenuOverlay = document.querySelector(".responsive-menu-overlay");
var navigationMenu = document.querySelector(".navigation-menu");
var selectLanguage = document.querySelector(".select-language");
var selectLanguageResponsive = document.querySelector(
    ".select-language-responsive"
);
var homeContentText = document.querySelectorAll(".home-content-text");
var footerAddressLine = document.querySelector(".footer-address-line");
var footerCopyright = document.querySelector(".footer-copyright");
var footerCompany = document.querySelector(".footer-company");
var languagesDropdown = document.querySelector(".dropdown-content");

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
       Global user experience functionality. (ie. toast message, dark mode)
 *******************************************************************************/

/************************************************************** 
      Adding the CSS for the themes and aquiring elements.
**************************************************************/

// Styles for the text headings, paragraphs, toast message (both light and dark) and its container.
const themeStyles = document.createElement("style");
themeStyles.innerHTML =
    ".dark-mode-heading { border: 1px solid rgb(226, 226, 226); color: rgb(226, 226, 226); } .dark-mode-text { color: rgb(226, 226, 226); } div.toast-msg-container { position: fixed; width: 100%; display: flex; justify-content: center; margin: auto; bottom: 10%; opacity: 0; user-select: none; visibility: hidden; } span.toast-msg { padding: 10px; width: wrap-content; background-color: rgba(0, 0, 0, 0.5); color: white; text-align: center; font-size: 20px; border-radius: 5px; } span.toast-msg-dark { padding: 10px; background-color: rgba(255, 255, 255, 0.5); color: black; text-align: center; font-size: 20px; border-radius: 5px; }";
document.querySelector("head").appendChild(themeStyles);
// For the flickity dots (separate constant because it will be added and removed from the body depending on the theme state).
const darkDotStyle = document.createElement("style");
darkDotStyle.innerHTML =
    ".flickity-viewport { background-color: rgb(20, 20, 20); } .flickity-page-dots .dot { background-color: white; }";

/****************************************************
    Any elements that can be queried once go here.
          (This is to save computing power)
 ****************************************************/

// Getting all the user option buttons.
const uxButtons = document.querySelectorAll("div[class='features']");

// Getting both the non responsive and responsive theme toggle buttons.
const themeToggleButtons = [uxButtons[0].children[0], uxButtons[1].children[0]];

// Getting both the non responsive and responsive language buttons.
const languageToggleButtons = [
    uxButtons[0].children[1],
    uxButtons[1].children[1],
]; // Toggle for language.

// Getting the inquiry form for the reservation page (if cannot be found, this is null, and will be handled properly).
const inquiryForm = document.querySelector("div.container");

/**************************************************************
                     Toast message handler.
 **************************************************************/

// Creating a toast message container and putting a toast message in it and adding it to the body.
const toastMsgContainerElem = document.createElement("div");
toastMsgContainerElem.className = "toast-msg-container";
toastMsgContainerElem.innerHTML = "<span class='toast-msg'>Msg here</span>";
document.body.appendChild(toastMsgContainerElem);

// Creating a constant variable of the toast container to interact with
const toastMsgContainer = document.querySelector("div.toast-msg-container");

// Creating a variable to directly interact with the toast message.
const toastMsg = toastMsgContainer.querySelector("span");

// Check for the toast message being displayed or not (this is to prevent spamming).
let toastShowing = false;
// Message to display, how long to let the user read it.
function toastMessage(message, readTime) {
    // Indicating to the client js that the toast function is already being ran.
    toastShowing = true;

    // Setting the message to display in the toast span.
    toastMsg.innerHTML = message;

    // Setting the opacity of its container to 0 (prep for animation) and unhiding it.
    toastMsgContainer.style.opacity = 0.0;
    toastMsgContainer.style.visibility = "visible";

    // Displaying the toast message to the user.
    var fadeIn = setInterval(function () {
        // If the toast message opacity is not equal to 1... (I don't know why I have to <= 0.99 but otherwise it jumps to 1.01)
        if (toastMsgContainer.style.opacity <= "0.99") {
            // Increment it by 0.01.
            toastMsgContainer.style.opacity =
                parseFloat(toastMsgContainer.style.opacity) + 0.01;
            // If it is equal to 1...
        } else {
            // Stop fading it in, it's already complete.
            clearInterval(fadeIn);
        }
    });

    // Wait a second before fading it out (to give it time to fade in, let the user read it, then fade out).
    setTimeout(function () {
        // Hiding the message from the user.
        var fadeOut = setInterval(function () {
            // If the toast message opacity is greater than 0...
            if (toastMsgContainer.style.opacity > "0.00") {
                // Decrement it by 0.01.
                toastMsgContainer.style.opacity =
                    parseFloat(toastMsgContainer.style.opacity) - 0.01;
                // If it is equal to 0...
            } else {
                // Stop fading it out, it's already complete.
                clearInterval(fadeOut);
                // Hiding the container again.
                toastMsgContainer.style.visibility = "hidden";
                // Indicating to the client js that the toast is not longer being shown, so the toast function can be executed again.
                toastShowing = false;
            }
        });
    }, readTime);
}

/**************************************************************
                    Dark mode functionality.
 **************************************************************/

/*
Checking if the theme was last set to dark. If it was, it will update the theme to be dark. If it was light,
it doesn't have to do anything because the default class styles are already adjusted for light theme.

Also checks if the theme is undefined, because if it is, it means the theme is light, as it's the user's
first time on the page.
*/
if (localStorage.theme == "dark") {
    // Only want to run this once all the elements are loaded in.
    window.onload = function () {
        enableDarkTheme();
    };
} else if (localStorage.theme == undefined) {
    localStorage.theme = "light";
}

// Event listener to make each of the theme toggle buttons work (both responsive and non responsive).
themeToggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
        if (!toastShowing) {
            // If the theme is light theme...
            if (localStorage.theme == "light") {
                // Set the theme to dark theme.
                enableDarkTheme();
                // Show a toast message to indicate to the user they just enabled dark mode.
                toastMessage("Dark mode enabled.", 1000);
                // If the theme is dark theme...
            } else {
                // Set the theme to light theme.
                enableLightTheme();
                // Show a toast message to indicate to the user they just enabled light mode.
                toastMessage("Light mode enabled.", 1000);
            }
        }
    });
});

// This function enables light theme for all pages on the site.
function enableLightTheme() {
    // Updating the theme preference in localStorage to light.
    localStorage.theme = "light";

    /**********************************************************
        This is where the restyling for light theme begins.
     **********************************************************/

    // Setting the body's background to white.
    document.body.style.backgroundColor = "white";

    // Setting both of the corresponding theme buttons to white.
    themeToggleButtons.forEach((button) => {
        button.style.color = "white";
    });

    // Setting the textinfo-headings and their corresponding text to black (for contrast to white body) by removing the dark-mode classes.
    document
        .querySelectorAll("div[class='textinfo-heading dark-mode-heading']")
        .forEach((heading) => {
            Array.from(heading.parentNode.children).forEach((child) => {
                child.classList == "textinfo-heading dark-mode-heading"
                    ? (child.classList = "textinfo-heading")
                    : child.removeAttribute("class");
            });
        });

    // Setting the main section paragraphs (quotes and text bodies) to black (for contrast to white body) by removing the dark-mode-text class.
    document.querySelectorAll("p:not(#chef-name)").forEach((text) => {
        text.classList == "dark-mode-text"
            ? text.removeAttribute("class")
            : (text.classList = text.classList.value.replace(
                  " dark-mode-text",
                  ""
              ));
    });

    // If the form is on this page...
    if (inquiryForm != null) {
        // Set its text to black (for contrast to white body) by removing the dark-mode-text class.
        // Form header.
        inquiryForm.querySelector("h3").removeAttribute("class");
        // Form input labels.
        inquiryForm.querySelectorAll("label").forEach((label) => {
            label.removeAttribute("class");
        });
    }

    // If the flickity dots are being used on this page...
    if (document.querySelector("ol.flickity-page-dots") != null) {
        // Remove the dark flickity dot style.
        document.querySelector("head").removeChild(darkDotStyle);
    }

    // Setting the toast message to light mode version.
    document.querySelector("span.toast-msg-dark").classList = "toast-msg";
}

// This function enables dark theme for all pages on the site.
function enableDarkTheme() {
    // Updating the theme preference in localStorage to dark.
    localStorage.theme = "dark";

    /**********************************************************
        This is where the restyling for dark theme begins.
     **********************************************************/

    // Setting the body background to black.
    document.body.style.backgroundColor = "black";

    // Setting both of the corresponding buttons to black.
    themeToggleButtons.forEach((button) => {
        button.style.color = "black";
    });

    // Setting the textinfo-headings and their corresponding text to white (for contrast to black background).
    document
        .querySelectorAll("div[class='textinfo-heading']")
        .forEach((heading) => {
            Array.from(heading.parentNode.children).forEach((child) => {
                child.classList == "textinfo-heading"
                    ? (child.classList = "textinfo-heading dark-mode-heading")
                    : (child.classList = "dark-mode-text");
            });
        });

    // Setting the main section paragraphs (quotes and text bodies) to white (for contrast to black body) by adding the dark-mode-text class.
    document.querySelectorAll("p:not(#chef-name)").forEach((text) => {
        text.classList == ""
            ? (text.classList = "dark-mode-text")
            : (text.classList += " dark-mode-text");
    });

    // If the form is on this page...
    if (inquiryForm != null) {
        // Set its text to white (for contrast to black body) by adding the dark-mode-text class.
        // Form header.
        inquiryForm.querySelector("h3").classList = "dark-mode-text";
        // Form input labels.
        inquiryForm.querySelectorAll("label").forEach((label) => {
            label.classList = "dark-mode-text";
        });
    }

    // If the flickity dots are being used on this page...
    if (document.querySelector("ol.flickity-page-dots") != null) {
        // Add the dark flickity dot style.
        document.querySelector("head").appendChild(darkDotStyle);
    }

    // Setting the toast message to dark mode version.
    document.querySelector("span.toast-msg").classList = "toast-msg-dark";
}

/**************************************************************
    Language functionality (only works site navigation bar).
 **************************************************************/

// language
var language = localStorage.getItem("language");
// if localStorage language is null, set the default languauge to "en"
if (language === null) {
    language = "en";
}
// initialize language
updateLanguage(language);

// update language on HTML
function updateLanguage(lang = "en") {
    // navigation menu
    const menuLength = languageData.navigation.menu.en.length;
    for (var index = 0; index < menuLength; index++) {
        navigationMenu.children[index].children[0].textContent =
            languageData.navigation.menu[lang][index];
    }

    // responsive navigation menu
    for (var index = 0; index < menuLength; index++) {
        responsiveMenuOverlay.children[0].children[
            index
        ].children[0].textContent = languageData.navigation.menu[lang][index];
    }

    // home -> content text
    for (var index = 0; index < homeContentText.length; index++) {
        homeContentText[index].children[0].textContent =
            languageData.home.content[lang][index][0];
        homeContentText[index].children[1].textContent =
            languageData.home.content[lang][index][1];
        homeContentText[index].children[2].textContent =
            languageData.home.content[lang][index][2];
    }

    // footer
    footerAddressLine.textContent = languageData.footer.address[lang];
    footerCopyright.textContent = languageData.footer.copyright[lang];
    footerCompany.textContent = languageData.footer.company[lang];

    // update <select>
    handleSelectOptions(lang);
}

// handle language select
selectLanguage.addEventListener("change", function (e) {
    const newLanguage = e.target.value;
    updateLanguageOnSelect(newLanguage);

    if (newLanguage === "en") {
        var en = selectLanguage.options[0];
        en.setAttribute("selected", true);
    } else if (newLanguage === "fr") {
        var fr = selectLanguage.options[1];
        fr.setAttribute("selected", true);
    }
});

// handle language select - responsive menu
selectLanguageResponsive.addEventListener("change", function (e) {
    const newLanguage = e.target.value;
    updateLanguageOnSelect(newLanguage);

    handleSelectOptions(newLanguage);
});

function updateLanguageOnSelect(newLanguage) {
    // save new language
    localStorage.setItem("language", newLanguage);
    updateLanguage(newLanguage);

    handleSelectOptions(newLanguage);

    if (!toastShowing) {
        // Display toast message showing update to language.
        toastMessage(
            newLanguage == "en"
                ? "Changed language preference to English."
                : "Modification de la préférence linguistique en Français.",
            2000
        );
    }
}

function handleSelectOptions(newLanguage) {
    if (newLanguage === "en") {
        var en = selectLanguage.options[0];
        en.setAttribute("selected", true);

        var enResponsive = selectLanguageResponsive.options[0];
        enResponsive.setAttribute("selected", true);
    } else if (newLanguage === "fr") {
        var fr = selectLanguage.options[1];
        fr.setAttribute("selected", true);

        var frResponsive = selectLanguageResponsive.options[1];
        frResponsive.setAttribute("selected", true);
    }
}
