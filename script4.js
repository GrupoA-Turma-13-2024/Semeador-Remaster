let currentIndex10 = 0;

function showSlide10(index10) {
    const slides10 = document.querySelectorAll('.carousel10-item');
    if (index10 >= slides10.length) {
        currentIndex10 = 0;
    } else if (index10 < 0) {
        currentIndex10 = slides10.length - 1;
    } else {
        currentIndex10 = index10;
    }
    slides10.forEach((slide10, r) => {
        slide10.classList.toggle('active', r === currentIndex10);
    });
}

function nextSlide10() {
    showSlide10(currentIndex10 + 1);
}

function prevSlide10() {
    showSlide10(currentIndex10 - 1);
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide10(currentIndex10);
});



setInterval(() => {
nextSlide10();
}, 5000);