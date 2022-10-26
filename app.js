// import { timestart } from './scripts/timeStart.js';


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
const AUDIO_SELECT = new Audio("./audio/select.wav");
const BLOCK_IMG = document.querySelector(".block_img");
const HEARTS = document.querySelector(".hearts");
let count = 0;

const faceOne = document.querySelector(".face_one");
const faceTwo = document.querySelector(".face_two");
const faceThree = document.querySelector(".face_three");

const dangerOne = document.querySelector(".danger_one");
const dangerTwo = document.querySelector(".danger_two");
const dangerThree = document.querySelector(".danger_three");
let counterSeconds;

function SOUND_SELECT() {
    return AUDIO_SELECT.play();
}

function timestart() {
    timer = setInterval(function () {
        counterDisplayElem.innerHTML = ++count;
    }, 1000);
}



function soundOnOff() {
    btnSound.classList.toggle("sound_on");
    if (btnSound.classList.contains("sound_on")) {
        AUDIO_BG.play();
    } else {
        AUDIO_BG.pause();
    }
}
btnSound.onclick = soundOnOff;

//----------

function startGame() {
    BLOCK_IMG.classList.remove("before_start");
    block.classList.add("active");
    character.classList.add("active");
    timestart();
    btnPause.style.display = "none";
    soundOnOff();
}
btnPause.onclick = startGame;

//----------------

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

function endGameChanges() {
    btnRefresh.classList.add('display-block')
    BLOCK_IMG.classList.add('display-block')
    HEARTS.classList.add('display-block')
    gameOverAlert.classList.add('display-block')
    character.classList.add('character-afterEnd')
    counterDisplayElem.classList.add('counter-display-afterEnd')   
    block.style.animation = "none";

    AUDIO_BG.pause();
    AUDIO_GAMEOVER.play();
    clearInterval(timer);
}

setInterval(() => {
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
        endGameChanges();
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


//Danger Classes
function removeDangerClass() {
    if (block.classList.contains("d_one")) {
        block.classList.remove("d_one");
    }
    if (block.classList.contains("d_two")) {
        block.classList.remove("d_two");
    }
    if (block.classList.contains("d_three")) {
        block.classList.remove("d_three");
    }
    if (BLOCK_IMG.classList.contains("d_one")) {
        BLOCK_IMG.classList.remove("d_one");
    }
    if (BLOCK_IMG.classList.contains("d_two")) {
        BLOCK_IMG.classList.remove("d_two");
    }
    if (BLOCK_IMG.classList.contains("d_three")) {
        BLOCK_IMG.classList.remove("d_three");
    }
}


dangerOne.onclick = function() {
    removeDangerClass();
    block.classList.add("d_one");
    BLOCK_IMG.classList.add("d_one");
}
dangerTwo.onclick = function() {
    removeDangerClass();
    block.classList.add("d_two");
    BLOCK_IMG.classList.add("d_two");
}
dangerThree.onclick = function() {
    removeDangerClass();
    block.classList.add("d_three");
    BLOCK_IMG.classList.add("d_three");
}
//-----


//Face classes
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


faceOne.onclick = function(){
    removeFaceClass();
    character.classList.add("one");
}
faceTwo.onclick = function(){
    removeFaceClass();
    character.classList.add("two");
}
faceThree.onclick = function(){
    removeFaceClass();
    character.classList.add("three");
}
