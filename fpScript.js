new Typed('#typed', {
    strings: [
        "Welcome to Et3allem Sa7",
        "This is My Official Website",
        "Let's Check who am I",
    ],
    typeSpeed: 60,
    backSpeed: 40,
    loop: true,
    backDelay: 1500,
    showCursor: true,
    cursorChar: ""
    });
window.addEventListener('scroll', function () {
    const part1 = document.querySelector('.part1');
    const rect = part1.getBoundingClientRect();
    
    if (rect.top <= window.innerHeight - 100 && rect.bottom >= 90) {
        part1.classList.add('animate');
    } else {
        part1.classList.remove('animate');
    }
});

const track = document.getElementById("carousel");
const buttons = track.querySelectorAll("button");
const itemWidth = 400;
const totalItems = buttons.length;

let index = 1; 

track.style.transform = `translateX(-${index * itemWidth}px)`;

function updateCarousel() {
    track.style.transition = "transform 0.4s ease";
    track.style.transform = `translateX(-${index * itemWidth}px)`;
}

function jumpTo(position) {
    track.style.transition = "none";
    index = position;
    track.style.transform = `translateX(-${index * itemWidth}px)`;
}

document.querySelector(".arrow.right").addEventListener("click", () => {
    index++;
    updateCarousel();

    if (index === totalItems - 1) {
        setTimeout(() => jumpTo(1), 400);
    }
});

document.querySelector(".arrow.left").addEventListener("click", () => {
    index--;
    updateCarousel();

    if (index === 0) {
        setTimeout(() => jumpTo(totalItems - 2), 400);
    }
});
