var languageData = {
    navigation: {
        menu: {
            en: ["home", "about", "reservation", "menu", "contact"],
            fr: ["domicile", "À propos", "réservation", "menu", "contact"],
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

// proof of concept for multiple languages

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
