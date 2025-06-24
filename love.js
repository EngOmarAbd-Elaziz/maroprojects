const messages = document.querySelectorAll(".message");
let index = 0;

function showMessages() {
    if (index < messages.length) {
    messages[index].style.opacity = 1;
    index++;
    setTimeout(showMessages, 2000);
    } else {
    document.getElementById("question").style.display = "block";
    document.getElementById("buttons").style.display = "block";
    }
}

showMessages();

const noBtn = document.getElementById("noBtn");
noBtn.addEventListener("click", () => {
    const maxX = window.innerWidth - 80;
    const maxY = window.innerHeight - 80;
    const randX = Math.random() * maxX;
    const randY = Math.random() * maxY;
    noBtn.style.left = `${randX}px`;
    noBtn.style.top = `${randY}px`;
});

function showLove() {
    alert("I love you too ❤️");
} 
function createFlower() {
    const flower = document.createElement("img");
    flower.src = "https://pngimg.com/uploads/heart/heart_PNG51313.png";
    flower.className = "flower";

    const isLeft = Math.random() < 0.5;
    flower.style.left = isLeft ? `${Math.random() * 30}px` : "";
    flower.style.right = !isLeft ? `${Math.random() * 30}px` : "";

    document.body.appendChild(flower);

    setTimeout(() => {
        flower.remove();
    }, 5000);
}

setInterval(createFlower, 800);
