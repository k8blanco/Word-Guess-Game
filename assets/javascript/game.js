// Medieval Word Games JS


//insult array
    var insultArray = ["fopdoodle", "driggle-draggle", "cream-faced loon", "tardy-gaited clack-dish", "tottering hedge-born churl", 
                        "reeling-ripe incontinent varlet", "frothy half-faced foot-licker", "wayward flap-dragon", "spur-galled canker blossom",
                        "glos pautonnier", "cream-faced cox-comb", "crooked-nosed knave", "meddling skamelar", "mandrake mymmerkin"];

//compliment array
    var complimentArray = ["rare best-tempered wafer-cake", "brave young-eyed smilet", "sugared well-wishing welsh cheese", "gallant sweet-suggesting nose-herb",
                            "celestial tiger-booted cukoo-bud"]

//computer chooses word
    var computerChoice = ["knight", "lord", "feudal", "plague", "bishop", "religion", "witchhunt", 
                            "inquisition", "peasant", "witch", "camelot", "arthur", "druid",
                            "merlin", "wizard", "morgana", "goblet", "poison", "borgias", "dragon", 
                            "coconuts", "elderberries", "lancelot",
                            "sir", "majesty", "fleshwound", "sword", "holygrail"];

//create variables to hold directions & scoreboard items
    var startText = document.getElementById("start");
    var choiceText = document.getElementById("choice");
    var gameOverText = document.getElementById("gameOver");
    var youWinText = document.getElementById("youWin");
    var guessesLeftText = document.getElementById("guessesLeft");
    var blankWordText = document.getElementById("blankWord");
    var winsText = document.getElementById("wins");
    var lossesText = document.getElementById("losses");
    var guessedText = document.getElementById("guessed");
    var beginAgainText = document.getElementById("beginAgain")

//create variable currentWord and secretWordArray 
    var currentWord;
    var secretWordArray = [];
    getRandomWord();

//create getRandomWord function
    function getRandomWord() {
        currentWord = computerChoice[Math.floor(Math.random() * computerChoice.length)];
            alert(currentWord);

        //create underscores
        for (var i = 0; i < currentWord.length; i++) {
            secretWordArray[i] = "_";
        }
    }

//gets link for music(theme) and sound effect
    var themeMusic = document.createElement("audio");
        themeMusic.setAttribute("src", "assets/sounds/minstrel.mp3");
    
    var victorySnd = document.createElement("audio");
        victorySnd.setAttribute("src", "assets/sounds/ecentric.wav");
   
    var defeatSnd = document.createElement("audio");
        defeatSnd.setAttribute("src", "assets/sounds/hamster.wav");

//music(theme) function
    function playMusic() {
        themeMusic.play();
    }

    function pauseMusic() {
        themeMusic.pause();
    }

//sound effect function
    function playVictorySnd() {
        victorySnd.play();
    }

    function playDefeatSnd() {
        defeatSnd.play();
    }

//create scoreboard variables/guessed array
    var wins = 0;
    var losses = 0;
    var guessed = [];
    var guessesLeft = 10;

//create retrieve button variable
    var retrieveBtn = document.getElementById("toggleBtn");

//make button toggle
    function togglebutton() {
        //make button visible
        if (retrieveBtn.style.visibility === "hidden") {
            retrieveBtn.style.visibility = "visible";
        } 
        else {
            retrieveBtn.style.visibility = "hidden";
        }
    }
  
//when user clicks Yes button, begin new game
    function reset() {
        alert("we are now entering the reset zone");
        //reset word array
        secretWordArray = [];
        //computer chooses another word to play
        getRandomWord();
        //reset scoreboard
        guessesLeft = 10;
        guessed = [];
        //hide text
        gameOverText.textContent = "";
        youWinText.textContent = "";
        beginAgainText.textContent = "";
        //reset text
        guessedText.textContent = "Guessed Letters: ";
        choiceText.textContent = "You chose: ";
        blankWordText.textContent = secretWordArray.join(" "); //doesn't clear totally if a longer word was before

        //hide button
        togglebutton();
    }


//user starts game 
    document.onkeyup = function(event) {
        var userChoice = event.key;

    //computer chooses insult
        var insult = insultArray[Math.floor(Math.random() * insultArray.length)];
    
    //computer chooses compliment
        var compliment = complimentArray[Math.floor(Math.random() * complimentArray.length)];
    
    //tracks letters already guessed
        if (guessed.includes(userChoice)) {
            alert("Thou hast already guessed that, thou " + insult + "!");
            //stop this code
            return;
        }
        //if letter is correct, it reveals letter in word
        else guessed.push(userChoice);
   
    //display scoreboard
        choiceText.textContent = "You chose: " + userChoice;
        guessedText.textContent = "Guessed Letters: " + guessed.join(", ");
        guessesLeftText.textContent = "Guesses Left: " + guessesLeft;
        winsText.textContent = "Wins: " + wins;
        lossesText.textContent = "Losses: " + losses;

    //hide directions
        start.textContent = "";

    //display the underscores as a string
        blankWordText.textContent = secretWordArray.join(" ");

    //determine if letter is in word
        var isCorrect = false;
        for (var i = 0; i < currentWord.length; i++) {
            if (currentWord[i] === userChoice) {
                secretWordArray[i] = userChoice;
                blankWordText.textContent = secretWordArray.join(" ");
                isCorrect = true;
            } 
        }

    //set win and loss variables
        var hasWon = false;
        var hasLost = false;

    //if word is guessed
        if (secretWordArray.indexOf('_') == -1) {
            //display You Win
            youWinText.textContent = "Thou hast won, thou " + compliment + "!";
            //update wins tally
            wins++;
            winsText.textContent = "Wins: " + wins;
            //set variable as true
            hasWon = true;
        }

     //if letter is incorrect, it displays under incorrect guesses
        if (isCorrect === false) {
            //take away from guess tally
            if (guessesLeft > 0) {
                guessesLeft--
            };
            guessesLeftText.textContent = "Guesses Left: " + guessesLeft;
        }

      //when guesses are 0 - tally loss
        if (guessesLeft === 0) {
            //display Game Over
             gameOverText.textContent = "Game Over, thou " + insult + "!";
             //update losses tally
             losses++;
             lossesText.textContent = "Losses: " + losses;
             //set variable as true
            hasLost = true;
            //stop taking userinput
            
        }

    // when win or lose display new game message and button
        if (hasWon || hasLost) {
            beginAgainText.textContent = "Dost thou wish to guess another word?" 
            togglebutton();
        }

        //when user wins or loses, trigger sound
        if (hasWon) {
            //play victory sound
            playVictorySnd()
        }
        if (hasLost) {
            //play defeat sound
            playDefeatSnd()
        }
    
    }
        

