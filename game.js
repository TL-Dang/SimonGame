const buttonColors = ["red", "blue", "green", "yellow"];

// Create empty array for game pattern
gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keyup(function () {
    if (!started) {

        // Changes h1 title from "Press A Key to Start" to "Level 0" when game is started.
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1500);
        }
    } else {
        playSound("wrong");

        $("body").addClass("game-over");
        $("#level-title").text("Game Over,  Press Any Key to Restart");
       
       
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 150);

        startOver();
    }
}

function nextSequence() {

    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    var randNum = Math.floor(Math.random() * 4);

    var randChosenColor = buttonColors[randNum];

    // Add randChosenColor to gamePattern
    gamePattern.push(randChosenColor);

    // Use jQuery to select the same id as randChosenColor
    $("#" + randChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randChosenColor);
}

function playSound(name) {

    // Play audio for button color selected
    const audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 150);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}