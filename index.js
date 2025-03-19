const Board = document.querySelector("#gameCanvas");
const ctx = Board.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = Board.width;
const gameHeight = Board.height;
const boardBackground = "lightgreen";
const snakeColour = "lightblue";
const snakeBoarder = "blue";
const foodColour = "red";
const uSize = 20;
let running = false;
let xVelocity = uSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    {x:uSize * 4, y:0},
    {x:uSize * 3, y:0},
    {x:uSize * 2, y:0},
    {x:uSize, y:0},
    {x:0, y:0}
]

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart(){
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if (running){
        clearBoard();
        drawFood();
        moveSnake();
        drawSnake();
        checkGameOver();
        setTimeout(nextTick, 75);
    }
    else{
        displayGameOver();
    }
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / uSize) * uSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - uSize);
    foodY = randomFood(0, gameWidth - uSize);
};
function drawFood(){
    ctx.fillStyle = foodColour;
    ctx.strokeStyle = "darkred";
    ctx.fillRect(foodX, foodY, uSize, uSize);
    ctx.strokeRect(foodX, foodY, uSize, uSize);
};
function moveSnake(){
    const head = {x: snake[0].x + xVelocity, y: snake[0].y + yVelocity};
    snake.unshift(head);
    if(snake[0].x == foodX && snake[0].y == foodY){
        score++;
        scoreText.textContent = score;
        createFood();
    }
    else{
        snake.pop();
    }
};
function drawSnake(){
    ctx.fillStyle = snakeColour;
    ctx.strokeStyle = snakeBoarder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, uSize, uSize);
        ctx.strokeRect(snakePart.x, snakePart.y, uSize, uSize);
    });
};
function changeDirection(event){
    const keyPressed = event.keyCode;
    console.log(keyPressed);
    const Left = 37;
    const Right = 39;
    const Up = 38;
    const Down = 40; 

    const goingLeft = (xVelocity == -uSize);
    const goingRight = (xVelocity == uSize);
    const goingUp = (yVelocity == -uSize);
    const goingDown = (yVelocity == uSize);

    switch(true){
        case(keyPressed == Left && !goingRight):
            xVelocity = -uSize;
            yVelocity = 0;
            break;
        case(keyPressed == Up && !goingDown):
            xVelocity = 0;
            yVelocity = -uSize;
            break;
        case(keyPressed == Right && !goingLeft):
            xVelocity = uSize;
            yVelocity = 0;
            break;
        case(keyPressed == Down && !goingUp):
            xVelocity = 0;
            yVelocity = uSize;
            break;
    }

};
function checkGameOver(){
    switch(true){
        case(snake[0].x < 0):
            running = false;
            break;
        case(snake[0].x >= gameWidth):
            running = false;
            break;
        case(snake[0].y < 0):
            running = false;
            break;
        case(snake[0].y >= gameHeight):
            running = false;
            break;
    }

    for(let i = 1; i < snake.length; i++){
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y ){
            running = false;
            break;
        }
    }
};
function displayGameOver(){
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("YOU DIED!", gameWidth / 2, gameHeight / 2 );
};
function resetGame(){
    score = 0;
    xVelocity = uSize;
    yVelocity = 0;
    snake = [
        {x:uSize * 4, y:0},
        {x:uSize * 3, y:0},
        {x:uSize * 2, y:0},
        {x:uSize, y:0},
        {x:0, y:0}
    ]
    gameStart();
};




