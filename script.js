
let buttons=document.querySelectorAll(`.btn`);
let historyBtn=document.querySelector(`.history-btn`);
let btn=document.querySelector(`.btn`);

function setLoading(){

    document.getElementById(`lose`).classList.remove(`verdict1`);
    document.getElementById(`win`).classList.remove(`verdict2`);
    document.getElementById(`draw`).classList.remove(`verdict3`);

    document.getElementById(`lt`).classList.add(`loading-text`)
    document.getElementById(`loading`).classList.add(`loading-line-container`)
    document.getElementById(`ll`).classList.add(`loading-line`)
}

let score={
    lose:0,
    win:0,
    draw:0,
    }

function getScoreFromLocalStorage(){
    const scoreStr=localStorage.getItem("Score");

    // here we check if JSON.parse(scoreStr) is undefined. This check is important because It check for the very 1st gameplay when no score was set on local storage. Here, if it is undefined, it means that the player has not chicked his choice and the score is not set on local storage; so we swt the initial score, ie, 0. 
    score=JSON.parse(scoreStr)||{
        lose:0,
        win:0,
        draw:0,
        }
    // if(JSON.parse(scoreStr)==undefined){ 
    //     score={
    //         lose:0,
    //         win:0,
    //         draw:0,
    //     }
    // }
    // else {
    //     score=JSON.parse(scoreStr);
    // }
}
 


historyBtn.addEventListener(`click`,()=>{
    getScoreFromLocalStorage();
    alert(` Win: ${score.win}\n Lose: ${score.lose}\n Draw: ${score.draw}`)
})


function verdict(result){
    setTimeout(() => {
        let scr;
        if(result==0)
        {
            document.getElementById(`lose`).classList.add(`verdict1`);
            score.lose++;               //updates score
            scr=JSON.stringify(score);
            localStorage.setItem("Score",scr);   //sets score in the local storage
            // return setScoreToLocalStorage(scr)
        }
        else if(result==1)
        {
            document.getElementById(`win`).classList.add(`verdict2`);
            score.win++;
            scr=JSON.stringify(score);
            localStorage.setItem("Score",scr);
        }
        else{
            document.getElementById(`draw`).classList.add(`verdict3`);
            score.draw++;
            scr=JSON.stringify(score);
            localStorage.setItem("Score",scr);
        }
    }, 3006);
}


    Array.from(buttons).forEach((button)=>{
    button.addEventListener(`click`,(e)=>{
            const {target}=e;
            // console.log(target.innerHTML);
            palyerChoice=target.innerHTML;
            console.log(`Player choice ${palyerChoice}`)
            result(palyerChoice);
        })
        // result(palyerChoice);
    })


    const computerChoice=()=>{
    let choice;
    const randomNumber= Math.floor(Math.random()*3)+1;
    // console.log(`computer choice ${randomNumber}`);
    if(randomNumber==1){
        choice="Rock";
        console.log(`computer choice ${choice}`);
        return choice;
    }
    else if(randomNumber==2){
        choice="Paper";
        console.log(`computer choice ${choice}`);     
        return choice;
    }
    else{
        choice="Scissors";
        console.log(`computer choice ${choice}`);
        return choice;
    }

    // console.log(`computer choice ${choice}`);
    // return choice;

}

const result=(palyerChoice)=>{
    setLoading();
    setTimeout(()=>{
        document.getElementById(`lt`).classList.remove(`loading-text`);
        document.getElementById(`loading`).classList.remove(`loading-line-container`);
        document.getElementById(`ll`).classList.remove(`loading-line`);
    },3005)

    let Computerchoice=computerChoice();  

        let result=0;

        if(Computerchoice=="Rock"){
            if(palyerChoice=="Paper"){
                result=1;  //win
                verdict(result);
                // verdict(result)
            }
            else if(palyerChoice=="Scissors"){
                result=0;   //lose
                verdict(result);
            }
            else{
                verdict(result);
            }
        }
        else if(Computerchoice=="Paper")
        {
            if(palyerChoice=="Rock")
            {
                result=0;
                verdict(result);
            }
            else if(palyerChoice=="Scissors")
            {
                result=1;
                verdict(result);
            }
            else{
                verdict(result);
            }
        }
        else{
            if(palyerChoice=="Rock")
            {
                result=1;
                verdict(result);
            }
            else if(palyerChoice=="Paper"){
                result=0;
                verdict(result);
            }
            else{
                verdict(result);
            }
        }
}
// result();