const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const hitSound = document.getElementById("hit-sound");
const failSound = document.getElementById("fail-sound");

let circle = { x: 200, y: 200, radius: 40 };
let gameInterval;
let timeLeft = 10;
let gameRunning = false;

function startGame() {
    document.getElementById("start-screen").style.display = "none";
    canvas.style.display = "block";

    gameRunning = true;
    timeLeft = 10;

    gameInterval = setInterval(gameLoop, 1000);

    drawCircle();
}

function gameLoop() {
    timeLeft--;

    moveCircle();
    drawCircle();

    if (timeLeft <= 0) {
        endGame(false);
    }
}

function moveCircle() {
    circle.x = Math.random() * (canvas.width - 80) + 40;
    circle.y = Math.random() * (canvas.height - 80) + 40;
}

function drawCircle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Tempo: " + timeLeft, 10, 30);

    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.shadowBlur = 15;
    ctx.shadowColor = "rgba(0, 0, 255, 0.5)";
    ctx.fill();
    ctx.shadowBlur = 0;
}

canvas.addEventListener("click", (event) => {
    if (!gameRunning) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const dist = Math.sqrt((mouseX - circle.x)**2 + (mouseY - circle.y)**2);

    if (dist <= circle.radius) {
        hitSound.play();
        endGame(true);
    }
});

function endGame(victory) {
    gameRunning = false;
    clearInterval(gameInterval);

    canvas.style.display = "none";
    document.getElementById("end-screen").style.display = "block";

    if (victory) {
        document.getElementById("end-message").innerText = "🎉 Você acertou!";
    } else {
        document.getElementById("end-message").innerText = "❌ O tempo acabou!";
        failSound.play();
    }
}

function reloadGame() {
    location.reload();
}
