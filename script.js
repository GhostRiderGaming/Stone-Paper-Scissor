let userScore = 0;
let compScore = 0;
let userWin = true;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
let msgcon = document.querySelector(".msg-container");
const userScorePara = document.querySelector("#userScore");
const compScorePara = document.querySelector("#compScore");
const newGamebtn = document.querySelector("#newgame");

newGamebtn.addEventListener("click",()=>{
       userScore=0;
       userScorePara.innerText=userScore;
       compScore=0;
       compScorePara.innerText=compScore;
       msg.innerText="Play your move!";
       msg.style.backgroundColor="#141313a5";
       document.getElementById("showChoice").style.display="none";
       
});

const showWinner = (userWin,draw) =>{

   
    if(userWin){
        userScore++;
        userScorePara.innerText=userScore;
        userScorePara.classList.add("score-up");
        msg.innerText="Congratulations! You Won the Game";
        msg.style.backgroundColor = "green";
        msgcon.classList.add("winning");
        document.getElementById("showChoice").style.display="flex";
        showConfetti(); 
    }
    else{
        compScore++;
        compScorePara.innerText=compScore;
        compScorePara.classList.add("score-up");
        msg.innerText="BAD LUCK!";
        msg.style.backgroundColor = "red";
        document.getElementById("showChoice").style.display="flex";
        msgcon.classList.add("winning");

    }

    setTimeout(() => {
        msgcon.classList.remove("winning");
        msgcon.classList.remove("winning");
    }, 1000);
    setTimeout(() => {
        userScorePara.classList.remove("score-up");
        compScorePara.classList.remove("score-up");
    }, 300);
}


const drawGame = () => {
    msg.innerText="Game was Draw!";
    msgcon.classList.add("winning");
    document.getElementById("showChoice").style.display="flex";
}

const genCompChoice = () => {
    const options =["stone","scissor","paper"];
    const randomIdx = Math.floor(Math.random()*3);
    return options[randomIdx];

}

const playGame = (userChoice) => {
    //Generate Computer Choice
    const compChoice = genCompChoice();


    if (userChoice==compChoice) {
        //Draw Condition
        drawGame();
    }
    else{
        if(userChoice==="stone"){
            userWin = compChoice === "paper" ? false : true;
        }
        else if(userChoice==="scissor"){
            userWin = compChoice === "stone" ? false : true;
        }
        else{
            userWin = compChoice === "scissor" ? false: true;
        }
    }
   
    document.getElementById("countdown").style.display = "block";

    let countdown = 3;
    let countdownInterval = setInterval(() => {
        document.getElementById("countdown").innerText = countdown;
        countdown--;
        

        if (countdown < 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown").style.display = "none";
            showChoices(userWin,userChoice,compChoice);
        }
    }, 1000);

    setTimeout(() => {
    showWinner(userWin,userChoice,compChoice);
    },4000);
};
function showChoices(userWin,userChoice,compChoice) {
    let playerDiv = document.getElementById("playerChoice");
    let computerDiv = document.getElementById("computerChoice");

    let icons = { "stone": "✊", "paper": "✋", "scissor": "✌️" };
    playerDiv.innerHTML = "Your Choice"+"<br>"+icons[userChoice];
computerDiv.innerHTML =  "Computer Choice"+"<br>"+icons[compChoice];

    if (userWin == true) {
        playerDiv.classList.add("winning");
    } else {
        computerDiv.classList.add("winning");
    }

    setTimeout(() => {
        playerDiv.classList.remove("winning");
        computerDiv.classList.remove("winning");
    }, 1000);
}

choices.forEach((choice) =>{
    choice.addEventListener("click", () =>{
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});



function showConfetti() {
    for (let i = 0; i < 20; i++) {
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.animationDuration = Math.random() * 2 + 1 + "s";
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Call showConfetti() when the player wins