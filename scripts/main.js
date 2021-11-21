var header = document.querySelector("#header");

window.addEventListener("scroll", function () {
    if (window.scrollY === 0) {
        // add background styling
        header.classList.remove("header-scroll");
    } else if (window.scrollY > 32) {
        // remove background styling
        header.classList.add("header-scroll");
    }
    // document.getElementById('showScroll').innerHTML = window.pageYOffset + 'px';
});
