function playSound(key) {
    let playSoundSource = "sounds/";
    switch (key) {
        case -1:
            playSoundSource += "wrong.mp3"
            break;
        case 0:
            playSoundSource += "green.mp3"
            break;
        case 1:
            playSoundSource += "yellow.mp3"
            break;
        case 2:
            playSoundSource += "red.mp3"
            break;                
        case 3:
            playSoundSource += "blue.mp3"
            break;
    }
    let audio = new Audio(playSoundSource);
    audio.play();
}

function animationButton(name) {
    let tmp = ".button-" + name;
    $(tmp).addClass("press");
    setTimeout(() => {
        $(tmp).removeClass("press");
    }, 100);
}

function errorAnimation() {
    $("body").addClass("error-background");
    setTimeout(() => {
        $("body").removeClass("error-background");
    }, 200);
}

class Button {
    constructor(value) {
        this.value = value;
        $(".button-" + value).click(function (e) {
            e.preventDefault();
            playSound(value);
            animationButton(value);
            arrPlay.push(value);
            checkGame();
        });
    }
}

let greenButton = new Button(0);
let yellowButton = new Button(1);
let redButton = new Button(2);
let blueButton = new Button(3);

let arrBase = [];
let arrPlay = [];
let playing = false;
let level = 0;

$(document).keypress(function () {
    if (playing === false)
        startGame();
});

function startGame() {
    playing = true;
    level = 0;
    arrBase = [];
    nextLevel();
}

function nextLevel() {
    level++;
    $("h1.title").text("Level " + level);
    arrPlay = [];
    let tmp = randomSequence();
    arrBase.push(tmp);
    setTimeout(() => {
        playSound(tmp);
        animationButton(tmp);        
    }, 400);
}

function gameOver() {
    playSound(-1);
    errorAnimation();
    $("h1.title").text("Game Over, Press Any Key to Restart");
    playing = false;
}

function compareSequence(base, tmp) {
    for (let index = 0; index < tmp.length; index++) {
        if (base[index] != tmp[index]) {
            return false;
        }
    }
    return true;
}

function checkGame() {
    tmp = compareSequence(arrBase, arrPlay);
    if (!tmp) {
        gameOver();
    } else if (arrBase.length === arrPlay.length)
        nextLevel();
}

function randomSequence() {
    return Math.floor(Math.random()*4);
}
