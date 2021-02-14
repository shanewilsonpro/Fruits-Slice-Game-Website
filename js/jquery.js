var playing = false;
var score;
var trialsLeft;
var step;
var action;
var fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango',
    'orange', 'peach', 'pear', 'watermelon'];

$(function () {
    //click on start button
    $("#startReset").click(function () {
        //we are playing
        if (playing == true) {
            //reload page
            location.reload();
        } else {
            //we are not playing
            playing = true; //game initiated

            //set score to 0
            score = 0;

            $("#scoreValue").html(score);

            //show trials left
            $("#trialsLeft").show();
            trialsLeft = 3;
            addHearts();

            //hide Game Over box
            $("#gameOver").hide();

            //change button text to reset button
            $("#startReset").html("Reset Game");

            //start sending fruits
            startAction();
        }
    });


    // --------- FUNCTIONS ---------

    //hearts as live on screen
    function addHearts() {
        $("#trialsLeft").empty();
        for (i = 0; i < trialsLeft; i++) {
            $("#trialsLeft").append('<img src="img/heart.png" class="life">');
        }
    }

    //sending the fruits on screen
    function startAction() {
        //to display a fruit
        $("#fruit1").show();

        //call function to generate a random fruit
        chooseFruit();

        //random position
        $("#fruit1").css({ 'left': Math.round(550 * Math.random()), 'top': -50 });

        //generate a random step
        step = 1 + Math.round(5 * Math.random()); //for change step

        //move fruit down by one step every 10ms
        action = setInterval(function () {

            //move fruit by one step
            $("#fruit1").css('top', $("#fruit1").position().top + step);

            //check if the fruit is too low
            if ($("#fruit1").position().top > $("#fruitsContainer").height()) {

                //check if have trials left
                if (trialsLeft > 1) {
                    //to display a fruit
                    $("#fruit1").show();

                    //call function to generate a random fruit
                    chooseFruit();

                    //random position
                    $("#fruit1").css({ 'left': Math.round(550 * Math.random()), 'top': -50 });

                    //generate a random step
                    step = 1 + Math.round(5 * Math.random()); //for change step

                    //reduce trials by one
                    trialsLeft--;

                    //populate trialsLeft box
                    addHearts();

                } else { //game over display
                    playing = false;

                    //change the button to Start Game
                    $("#startReset").html("Start Game");

                    //display the message of Game Over
                    $("#gameOver").show();
                    $("#gameOver").html('<p>Game Over!</p><p>Your score is ' + score + '</p>');

                    //hide the trials box
                    $("#trialsLeft").hide();

                    //call the function to stop the action of game
                    stopAction();
                }
            }
        }, 10);
    }

    //generate a random fruit
    function chooseFruit() {
        $("#fruit1").attr('src', 'img/' + fruits[Math.round(8 * Math.random())] + '.png');
    }

    //stop dropping fruits
    function stopAction() {
        clearInterval(action);
        $("#fruit1").hide();
    }

});