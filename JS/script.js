
let userSpeed = prompt("Please enter snak Speed (Ideal Choice is 15)");
if (userSpeed === null) {
    userSpeed = 15;
}
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let lastPaintTime = 0;
let snakeArray = [
    { x: 13, y: 15 }
];
let food = { x: 6, y: 7 };
let score = 0;

// Game Function
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / userSpeed) {
        return;
    }

    lastPaintTime = ctime;
    gameEngine();
}

//Check Accedent
function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArray.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // If you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

    return false;
}


function gameEngine() {
    // Part 1: Update snake array and Food
    if (isCollide(snakeArray)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again!");
        userSpeed = prompt("Please enter snak Speed (Ideal Choice is 15)");
        if (userSpeed === null) {
            userSpeed = 15;
        }
        snakeArray = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
    }


    // If eten food so generate new tastey food
    if (snakeArray[0].x === food.x && snakeArray[0].y === food.y) {
        foodSound.play();
        musicSound.play();
        score = score + 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            highestScoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        ScoreBox.innerHTML = "Score: " + score;

        snakeArray.unshift({ x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y });
        let a = 1;
        let b = 18;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // Moving Snake
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i + 1] = { ...snakeArray[i] };
    }

    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;

    // Part 2: Display array and Food 
    // Display Snake
    board.innerHTML = "";
    snakeArray.forEach((element, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = element.y;
        snakeElement.style.gridColumnStart = element.x;


        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // Display Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Main Logic
musicSound.play();

// Score
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore);
    highestScoreBox.innerHTML = "Heightest Score: " + hiscore;
}


// play background music 
musicSound.play();

// for re-print screen
window.requestAnimationFrame(main);

// for move which side to go
window.addEventListener('keydown', element => {
    inputDir = { x: 0, y: 1 } // start game
    moveSound.play();
    switch (element.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});
