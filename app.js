const btnRef = document.getElementById("btn_ref");
const block = document.getElementById("block");
const AUDIO = new Audio('./audio/backgroundmusic.mp3');
let counter = 0;
let counterDisplayElem = document.querySelector("counter-display");

function moveLeft() {
    let left = parseInt(
        window.getComputedStyle(character).getPropertyValue("left")
    );
    left -= 100;
    if (left >= 0) {
        character.style.left = left + "px";
    }
}

function moveRight() {
    let left = parseInt(
        window.getComputedStyle(character).getPropertyValue("left")
    );
    left += 100;
    if (left < 300) {
        character.style.left = left + "px";
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

block.addEventListener("animationiteration", () => {
    let random = Math.floor(Math.random() * 3);
    left = random * 100;
    block.style.left = left + "px";
    // audioScore.play();
    counter++;
});

// function updateDisplay() {
//     counterDisplayElem.innerHTML = counter;
// }

// setInterval(function () {
//     let characterLeft = parseInt(
//         window.getComputedStyle(character).getPropertyValue("left")
//     );
//     let blockLeft = parseInt(
//         window.getComputedStyle(block).getPropertyValue("left")
//     );
//     let blockTop = parseInt(
//         window.getComputedStyle(block).getPropertyValue("top")
//     );
//     if (characterLeft == blockLeft && blockTop < 500 && blockTop > 300) {
//         btnRef.style.display = "block";
//         block.style.animation = "none";
//         alert("Game over. Score: " + counter);
//     }
// }, 10);


document.getElementById("left").addEventListener("touchstart", moveLeft);
document.getElementById("right").addEventListener("touchstart", moveRight);


function playSound() {
    if (document.getElementById('audio-on').checked){
        AUDIO.play();
        AUDIO.loop();
    }else{
        AUDIO.pause();
    }
}

