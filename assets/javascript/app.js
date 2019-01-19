$(document).ready(function () {
    var trivia = [
        {
            question: "Which famous member of the Grateful Dead has an ice cream flavor named after him?", 
            choice: ["Bob Weir", "Jerry Garcia", "Phil Lesh", "Mickey Hart"],
            answer: 1,
            photo: "assets/images/Jerry.png"
         },
         {
            question: "What is the state bird of Utah?", 
            choice: ["California Gull", "Goldfinch", "Mountain Bluebird", "Black-capped Chickadee"],
            answer: 0,
            photo: "assets/images/Bird.jpg"
         }, 
         {
            question: "Which NFL quarterback has the most Super Bowl Rings?", 
            choice: ["Joe Montana", "Peyton Manning", "Tom Brady", "Terry Bradshaw" ],
            answer: 2,
            photo: "assets/images/Tom.JPG"
        }, 
        {
            question: "Which plant is commonly used to treat sunburns?", 
            choice: ["Aloe", "Agave", "Rose", "Hibiscus" ],
            answer: 0,
            photo: "assets/images/Aloe.JPG"
        }, 
        {
            question: "In what year did the US gain its independence?", 
            choice: ["1774", "1776", "1770", "1778" ],
            answer: 1,
            photo: "assets/images/1776.jpg"
        }, 
        {
            question: "Which famous fashion designer is credited with the popularization of the little black dress?", 
            choice: ["Coco Chanel", "Herve Leger", "Oscar de la Renta", "Georgio Armani" ],
            answer: 0,
            photo: "assets/images/Chanel.jpg"
        }, 
        {
            question: "Libya has a coastline on one large body of water. Which one is it?", 
            choice: ["Indian Ocean", "Mediterranean Sea", "Baltic Sea", "Atlantic Ocean" ],
            answer: 1,
            photo: "assets/images/Sea.jpg"
        }, 
        {
            question: "In war, which color flag symbolizes surrender or ceasefire?", 
            choice: ["Red", "Black", "Blue", "White" ],
            answer: 3,
            photo: "assets/images/Flag.jpg"
        }];
    
        var correctCount = 0;
        var wrongCount = 0;
        var unansweredCount = 0;
        var timer = 10;
        var timerChange;
        var timerOn = false;
        var userAnswer ="";
        var questionCount = trivia.length;
        var pick;
        var index;
        var newVersion = [];
        var base = [];
        
    
    
    $("#playAgain").hide();
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < trivia.length; i++) {
        base.push(trivia[i]);
    }
        })
    function runTimer(){
        if (!timerOn) {
            timerChange = setInterval(change, 1000); 
        timerOn = true;
        }
    }
    function change() {
        $("#timer").html("<h3>Time to go: " + timer + "</h3>");
        timer --;
    
        if (timer === 0) {
            unansweredCount++;
            stop();
            $("#answer").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
 
    function stop() {
        timerOn = false;
        clearInterval(timerChange);
    }
  
    function displayQuestion() {
      
        index = Math.floor(Math.random()*trivia.length);
        pick = trivia[index];
    
            $("#question").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
             
                userChoice.attr("data-guessvalue", i);
                $("#answer").append(userChoice);
  
    }
    
    
    
    
    $(".answerchoice").on("click", function () {
     
        userAnswer = parseInt($(this).attr("data-guessvalue"));
    
       
        if (userAnswer === pick.answer) {
            stop();
            correctCount++;
            userAnswer="";
            $("#answer").html("<p>Nice!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userAnswer="";
            $("#answer").html("<p>Nope! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture() {
        $("#answer").append("<img src=" + pick.photo + ">");
        newVersion.push(pick);
        trivia.splice(index, 1);

        setTimeout(function () {
            $("#answer").empty();
            timer = 10;


            if ((wrongCount + correctCount + unansweredCount) === questionCount) {
                $("#timer").empty();
                $("#question").empty();
                $("#question").html("<h3>Game Over!  Results: </h3>");
                $("#answer").append("<h4> Correct: " + correctCount + "</h4>");
                $("#answer").append("<h4> Incorrect: " + wrongCount + "</h4>");
                $("#answer").append("<h4> Unanswered: " + unansweredCount + "</h4>");
                $("#playAgain").show();
                correctCount = 0;
                wrongCount = 0;
                unansweredCount = 0;

            } else {

                displayQuestion();
                runTimer();
            }
        }, 2000);
    
    
    }
    
    $("#playAgain").on("click", function() {
        $("#playAgain").hide();
        $("#answer").empty();
        $("#question").empty();
        for(var i = 0; i < base.length; i++) {
            trivia.push(base[i]);
        }
        
        displayQuestion();
        runTimer();
    })
    
    })