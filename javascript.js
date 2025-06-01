document.addEventListener('DOMContentLoaded', function() {

    // 1. Landing Page Slider
    const landingSliderElement = document.getElementById('landing-slider');
    const landingImages = [
        'url("../images/slider-bg-1.jpg")', // GANTI PATH (../images/ jika js/script.js dan images/ sejajar index)
        'url("../images/slider-bg-2.jpg")',
        'url("../images/slider-bg-3.png")'
    ];
    let currentLandingImageIndex = 0;

    function changeLandingBackground() {
        if (!landingSliderElement || landingImages.length === 0) return;
        currentLandingImageIndex = (currentLandingImageIndex + 1) % landingImages.length;
        landingSliderElement.style.backgroundImage = landingImages[currentLandingImageIndex];
    }

    if (landingSliderElement && landingImages.length > 0) {
        landingSliderElement.style.backgroundImage = landingImages[0];
        setInterval(changeLandingBackground, 5000);
    }

    // 2. Greetings Slider
    let currentGreetingSlideIndex = 0;
    const greetingSlides = document.querySelectorAll('#greetings-slider-container .greetings-slide');
    const greetingNavButtons = document.querySelectorAll('.greetings-nav button');

    function showGreetingSlide(index) {
        if (greetingSlides.length === 0) return;
        greetingSlides.forEach((slide) => {
            slide.classList.remove('active');
        });
        currentGreetingSlideIndex = (index + greetingSlides.length) % greetingSlides.length;
        greetingSlides[currentGreetingSlideIndex].classList.add('active');
    }

    if (greetingNavButtons.length === 2) {
        greetingNavButtons[0].addEventListener('click', function() {
            showGreetingSlide(currentGreetingSlideIndex - 1);
        });
        greetingNavButtons[1].addEventListener('click', function() {
            showGreetingSlide(currentGreetingSlideIndex + 1);
        });
    }

    if (greetingSlides.length > 0) {
        showGreetingSlide(0);
    }

    // 3. Toggle Menu Mobile
    const headerLinksContainer = document.querySelector('.header .links'); // Target .links
    const hamburgerIcon = document.querySelector('.header .icon.mobile-nav-toggle');

    if (hamburgerIcon && headerLinksContainer) {
        hamburgerIcon.addEventListener('click', () => {
            headerLinksContainer.classList.toggle('active'); // Toggle .active pada .links
        });
    }
});