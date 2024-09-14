let slideIndex = 0; // Inizia con la prima slide
const slides = document.querySelectorAll('.image-slider .slide');
const totalSlides = slides.length;

// Funzione per cambiare slide
function showSlide(n) {
    slideIndex = (n + totalSlides) % totalSlides; // Cicla attraverso le slide
    const offset = -slideIndex * 100; // Calcola l'offset per la slide corrente
    document.querySelector('.image-slider .slides').style.transform = `translateX(${offset}%)`;
}

// Event listener per i pulsanti "prev" e "next"
document.querySelector('.prev').addEventListener('click', function() {
    showSlide(slideIndex - 1);
});

document.querySelector('.next').addEventListener('click', function() {
    showSlide(slideIndex + 1);
});

// Funzionalità touch per swipe
let startX = 0;
let endX = 0;

document.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
});

document.addEventListener('touchend', function(e) {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    let swipeThreshold = 50; // Distanza minima in pixel per considerare lo swipe
    if (startX - endX > swipeThreshold) {
        showSlide(slideIndex + 1); // Swipe a sinistra
    } else if (endX - startX > swipeThreshold) {
        showSlide(slideIndex - 1); // Swipe a destra
    }
}