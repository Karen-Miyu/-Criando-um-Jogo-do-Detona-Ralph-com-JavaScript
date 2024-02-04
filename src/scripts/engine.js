const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemmy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector("#life"),
    },
    values:{
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        life: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 500),
        countDownTimerId: setInterval(countDown, 800),
    },
};

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        audioOverOrWin();
    }
}

function audioOverOrWin() {
    if(state.values.result < 30) {
        state.values.life --;
        state.view.life.textContent = "x" + state.values.life;
        setTimeout(() => {
            alert("Game over! O seu resultado foi: " + state.values.result);
        }, 200)
        playSound1();
    }else {
        setTimeout(() => {
            alert("Viva~! O seu resultado foi: " + state.values.result);
        }, 200)
        playSound2();
    }
}

function playSound() {
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}
function playSound1() {
    let audio = new Audio("./src/audios/gameOver.mp3");
    audio.volume = 0.2;
    audio.play();
}
function playSound2() {
    let audio = new Audio("./src/audios/gameWin.mp3");
    audio.volume = 0.2;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square)=> {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
    state.view.squares.forEach((square)=> {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
        })
    });
}

function init(){
    addListenerHitBox();
}

init();