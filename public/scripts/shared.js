let mobileNav = document.getElementById('mobile-nav');
let backdrop = document.getElementById('backdrop');
let toggleButton = document.getElementById('toggle-button');

toggleButton.addEventListener('click', openMobileNav);
backdrop.addEventListener('click', closeMobileNav);
mobileNav.addEventListener('click', closeMobileNav);

function openMobileNav () {
    console.log("Opening Mobile Nav");
    backdrop.style.display = 'block';
    mobileNav.style.display = 'block';
    mobileNav.setAttribute('z-index', 200);
}

function closeMobileNav() {
    backdrop.style.display = 'none';
    mobileNav.style.display = 'none';
    mobileNav.setAttribute('z-index', '-1');
}


