/* Author - Tharusha Herath
   Date made: 2023-01-05
*/

//if we click on the start/reset
var operator = false;
var score;
var action;
var timeRemaining;
var answer;
//if we are playing
document.getElementById("start-reset").onclick=function(){
    //if we are playing
    if(operator==true){
        //reload page
        location.reload();
    } 
    //if we are not playing
    else{

        //variables at the start of the game
        score=0;
        timeRemaining = 60;
        
        //change button to reset
        document.getElementById("start-reset").innerHTML="Reset Game";
        //set score to 0
        document.getElementById("score-value").innerHTML=score;
        //show countdown box
        show("time-remaining")
        //changing the time remaining value
        document.getElementById("time-remaining-value").innerHTML = timeRemaining;
        
        //resets the game over screen if it was open
        hide("game-over");

        //change playing state to true
        operator=true;

        //start countdown
        startCountdown();

        //generate the Q&A
        generateQA();
    }
}

for(i=1;i<5;i++){
    //clicking on answer box
    document.getElementById("box"+i).onclick=function(){
        //check if we are playing
        if(operator==true){
            if (this.innerHTML == answer){
                //increase score by 1
                score ++;
                document.getElementById("score-value").innerHTML=score;
                //hide the wrong box
                hide("wrong");            
                //show correct box
                show("correct");
                setTimeout(function(){
                    hide("correct")
                },1000);
                //generate a new question
                generateQA();
            } else{
                //hide the wrong box
                show("wrong");            
                //show correct box
                hide("correct");
                setTimeout(function(){
                    hide("wrong")
                },1000);
            }   
        }
    }
}



//functions

//function for start countdown
function startCountdown(){
    action = setInterval(function(){
        timeRemaining -= 1;
        document.getElementById("time-remaining-value").innerHTML = timeRemaining;

        //when the timer is at 0 (game is over)
        if(timeRemaining == 0){
            stopCountdown();
            //show game over screen and show the updated message 
            show("game-over");
            document.getElementById("game-over").innerHTML = "<p> Game over!</p><p> Your score is " + score + ".</p>";
            //hide time remaining block
            hide("time-remaining");
            //switch text inside to start game          
            document.getElementById("start-reset").innerHTML = "Start game";

            //hide wrong or correct block
            hide("correct");
            hide("wrong");

            //reset playing state
            operator = false;
        }
    }, 1000);
}

//stop countdown
function stopCountdown(){
    clearInterval(action);
}


//function to show and hide element blocks
function hide(id){
    document.getElementById(id).style.display = "none";
}

function show(id){
    document.getElementById(id).style.display = "block";
}

//Generate the questions for the game 
function generateQA(){

    //randomize the values for the question
    var valueX = Math.ceil(Math.random() * 10);
    var valueY = Math.ceil(Math.random() * 10);
    //calculate the answer the random values
    answer = valueX * valueY;

    //put the question up for the user to view
    document.getElementById("question").innerHTML = valueX +" x " + valueY;

    //randomize a slot for the answer to be in
    var slot = Math.ceil(Math.random() * 4);

    //create all the buttons superficially
    createAnswer();

    //create the real answer button
    switch(slot){
        case 1:
            createButton("box1", answer);
            break;
        case 2:
            createButton("box2", answer);
            break;
        case 3:
            createButton("box3", answer);
            break;
        case 4:
            createButton("box4", answer);
            break;
    }
}

//function to answer for each box
function createAnswer(){
    var random;
    var arr = [answer];
    for (i=1;i<5;i++){
        random = Math.ceil(Math.random() * 100);
        while(arr.includes(random)){
            random = Math.ceil(Math.random() * 100);
        }
        arr.push(random);
        
        createButton("box" + i, random);
    }    
}

//create answer for a button
function createButton(id, answer){
    document.getElementById(id).innerHTML =  answer;
}

