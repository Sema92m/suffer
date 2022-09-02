const btnRefresh = document.getElementById("btn-refresh");
const btnPause = document.getElementById("btn-start");
const btnSound = document.querySelector(".sound_off_btn");
const block = document.querySelector(".block");
const character = document.querySelector(".character");

let counterDisplayElem = document.getElementById("counter-display");
let gameOverAlert = document.getElementById("gameover-alert");
const AUDIO_BG = new Audio("./audio/backgroundmusic.mp3");
AUDIO_BG.loop = true;
const AUDIO_GAMEOVER = new Audio("./audio/gameover.mp3");
const AUDIO_MOVE = new Audio("./audio/move.wav");
const BLOCK_IMG = document.querySelector(".block_img");
const HEARTS = document.querySelector(".hearts");
let count = 0;

const faceOne = document.querySelector(".face_one");
const faceTwo = document.querySelector(".face_two");
const faceThree = document.querySelector(".face_three");
let counterSeconds;

function timestart() {
    timer = setInterval(function () {
        counterDisplayElem.innerHTML = ++count;
    }, 1000);
}

function removeFaceClass() {
    if (character.classList.contains("one")) {
        character.classList.remove("one");
    }
    if (character.classList.contains("two")) {
        character.classList.remove("two");
    }
    if (character.classList.contains("three")) {
        character.classList.remove("three");
    }
}

function changeFaceOne() {
    removeFaceClass();
    character.classList.add("one");
}
function changeFaceTwo() {
    removeFaceClass();
    character.classList.add("two");
}
function changeFaceThree() {
    removeFaceClass();
    character.classList.add("three");
}

faceOne.onclick = changeFaceOne;
faceTwo.onclick = changeFaceTwo;
faceThree.onclick = changeFaceThree;

function soundOnOff() {
    btnSound.classList.toggle("sound_on");
    if (btnSound.classList.contains("sound_on")) {
        AUDIO_BG.play();
    } else {
        AUDIO_BG.pause();
    }
}
btnSound.onclick = soundOnOff;

function startGame() {
    block.classList.add("active");
    character.classList.add("active");
    timestart();
    btnPause.style.display = "none";
    soundOnOff();
}
btnPause.onclick = startGame;

function moveLeft() {
    let left = parseInt(
        window.getComputedStyle(character).getPropertyValue("left")
    );
    left -= 100;
    if (left >= 0) {
        character.style.left = left + "px";
        AUDIO_MOVE.play();
    }
}
function moveRight() {
    let left = parseInt(
        window.getComputedStyle(character).getPropertyValue("left")
    );
    left += 100;
    if (left < 300) {
        character.style.left = left + "px";
        AUDIO_MOVE.play();
    }
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        moveLeft();
    }
    if (event.key === "ArrowRight") {
        moveRight();
    }
});

let move = block.addEventListener("animationiteration", () => {
    let random = Math.floor(Math.random() * 3);
    left = random * 100;
    block.style.left = left + "px";
});
let move1 = block.addEventListener("animationiteration", () => {
    let random = Math.floor(Math.random() * 3);
    left = random * 100;
    block.style.left = left + "px";
});

setInterval(function () {
    let characterLeft = parseInt(
        window.getComputedStyle(character).getPropertyValue("left")
    );
    let blockLeft = parseInt(
        window.getComputedStyle(block).getPropertyValue("left")
    );
    let blockTop = parseInt(
        window.getComputedStyle(block).getPropertyValue("top")
    );
    if (characterLeft == blockLeft && blockTop < 500 && blockTop > 300) {
        btnRefresh.style.display = "block";
        block.style.animation = "none";

        character.style.bottom = "70px";
        character.style.scale = "1.5";
        character.style.left = "30px";

        BLOCK_IMG.style.display = "block";
        HEARTS.style.display = "block";
        gameOverAlert.style.display = "block";
        counterDisplayElem.style.left = "20px";
        counterDisplayElem.style.scale = "2";

        AUDIO_BG.pause();
        AUDIO_GAMEOVER.play();
        clearInterval(timer);
    }
}, 10);

document
    .getElementById("left")
    .addEventListener("touchstart", moveLeft, { passive: true });
document
    .getElementById("right")
    .addEventListener("touchstart", moveRight, { passive: true });
//{ passive: true} ---without it I have warning in colsole
// Consider marking event handler as 'passive' to make the page more responsive.
