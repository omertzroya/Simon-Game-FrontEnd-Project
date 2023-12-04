var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var bool=false;
var level="0";
var count=0;

/* function that choose the next random button in the next level*/
function nextSequence(){
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level "+level);
    userClickedPattern = [];
}

/*only a key press is starting the game*/
$(document).on("keypress",function(){
    if(bool===false)
    {
        $("#level-title").text("Level "+level);
        nextSequence();
        bool=true;
    }
   
});

/*saving the user's bottun click*/
$(".btn").on("click",function() {
        if(bool===true){
        var userChosenColour=$(this).attr("id");
        userClickedPattern.push(userChosenColour);
        animatePress(userChosenColour);
        playSound(userChosenColour);
        checkAnswer(userChosenColour);
        }

    });

/*play the bottun sound*/
function playSound(name){
    var clickAudio= new Audio("./sounds/"+name+".mp3");
    clickAudio.play();
}

/*bottun animation*/
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed"); 
    },100);
}

/*checking if the button press equal to the current color, if not the game reset*/
function checkAnswer(userChosenColour){
    if(userChosenColour===gamePattern[count]){
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence()}
                ,1000);
            count=0;    
        }
        else{
            count++;
        }
        console.log("seccsess");
    }
    else{
        console.log("wrong");
        var wrongAudio= new Audio("./sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")}
            ,200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver()   
    }
}

/*reset the game*/
function startOver(){
    userClickedPattern = [];
    gamePattern = [];
    bool=false;
    level="0";
    count=0;
}
