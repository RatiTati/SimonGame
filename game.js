var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var gameLevel = 0;

$(document).keypress(function(event){
    if(!gameStarted){
        $("#level-title").text("Level " + gameLevel);
        gameStarted = true;
        nextSequence(buttonColours);
    }
});

$(".btn").click(function(){
    var userClickedColor = $(this).attr("id");
    userClickedPattern.push(userClickedColor);

    animatePress(userClickedColor);
    playSound(userClickedColor);

    var answer = checkAnswer(userClickedPattern.length - 1);
});

function nextSequence(colors){
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random()*colors.length);
    var randomChosenColor = buttonColours[randomNumber];

    gamePattern.push(randomChosenColor);

    animatePress(randomChosenColor);
    playSound(randomChosenColor);

    gameLevel++;

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#level-title").text("Level " + gameLevel);
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("Success!")
        
        if(userClickedPattern.length === gameLevel){
            setTimeout(function(){
                nextSequence(buttonColours);
            }, 500);  
        }
    }
    else{
        console.log("Failed!") 
        gameOver();
    }
}

function gameOver(){
    gamePattern = [];
    gameLevel = 0;
    gameStarted = false;

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over! Press Any Key to Restart");
}




