let userScore = 0;
let compScore = 0;
let userWin = true;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

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
});

const showWinner = (userWin) =>{
    if(userWin){
        userScore++;
        userScorePara.innerText=userScore;
        msg.innerText="Congratulations! You Won the Game";
        msg.style.backgroundColor = "green";
    }
    else{
        compScore++;
        compScorePara.innerText=compScore;
        msg.innerText="Congratulations!You are fucked";
        msg.style.backgroundColor = "red";
    }
}


const drawGame = () => {
    msg.innerText="Game was Draw!";
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
    showWinner(userWin);
};

choices.forEach((choice) =>{
    choice.addEventListener("click", () =>{
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

