// Do not use the "map"
var socket;
let resetBool;
let randomColor;
let gamestate1;
let gamestate2;
let rectX;
let rectY;
let rectX2;
let rectY2;
let time2;

function setup() {
  // put setup code here
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100);
  background(51);
  randomColor = random(0,360);
  red = 0;
  rectX = 50;
  rectY = 50;
  rectX2 = 100
  rectY2 = 50;
  time2 =  200;

  gamestate1 = "startmenu";
  gamestate2 = "startmenu";


  socket = io.connect("http://localhost:3000/");

  //If this socket receives a message called mouse, it will call newdrawing
  socket.on('move', movement2);
  socket.on('state', statt);
}

function statt(data3){
  gamestate2 = data3.newGamestate;
  //Accidentally wrote "==" here instead of "="
}

function draw() {
  // background(0);
  // rect(rectX,rectY,50,50);
  // rect(rectX2,rectY2, 50, 50);
  // movement();
  if(gamestate1 == "startmenu"){
    startMenu();
  }
  else if(gamestate1 == "menu2"){
    menuu();
  }
  else if(gamestate1 == "menu3"){
    mapp();
  }
  else if(gamestate1 == "menu4" && gamestate2 != "menu4"){
    waitt();
  }
  else if(gamestate1 == "menu4" && gamestate2 == "menu4"){
    //startt();
    gameRunning();
  }
  else if(gamestate1 == "gameover"){
    endGame();
  }

}

function movement(){
    if (keyIsDown(LEFT_ARROW)) {
      rectX -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      rectX += 5;
    }
    if (keyIsDown(UP_ARROW)) {
      rectY -= 5;
    }
    if (keyIsDown(DOWN_ARROW)) {
      rectY += 5;
    }
    

    var data2 = {
      newRectX: rectX,
      newRectY: rectY
    }

    socket.emit('move', data2);
}

function movement2(data2){
  rectX2 = data2.newRectX;
  rectY2 = data2.newRectY;
}

function startMenu(){
    background(red, 100, 100);
    rect(100, 200, 200, 50);
    textSize(50);
    text("Coin Collector!", 40, 100);
    textSize(15);
    text("Click Here To Start Game!", 110, 230);
    textSize(20);
    //text(`Can you beat the highscore of ${highScore}?`, 60, 130);
    //This was causing the error
    textSize(15);
  
}

function mouseClicked() {

  if (mouseX > 100 && mouseX < 300 && mouseY > 200 && mouseY < 250 && gamestate1 == "startmenu") {
    gamestate1 = "menu2";
  } 
  else if (mouseX > 100 && mouseX < 300 && mouseY > 200 && mouseY < 250 && gamestate1 == "menu2") {
    gamestate1 = "menu3";
    // resetAll();
    // gameState = "notStarted";
    // gameIsOver = false;
  }
  else if (mouseX > 100 && mouseX < 300 && mouseY > 200 && mouseY < 250 && gamestate1 == "menu3") {
    gamestate1 = "menu4";

    var data3 = {
      newGamestate: gamestate1,
      x: 3
    }
    
    socket.emit('state', data3);

  }
  

}

function menuu(){
  background(red, 100, 100);
  rect(100, 200, 200, 50);
  textSize(50);
  text("Choose Your Character!", 40, 100);
  textSize(15);
  text("Continue!", 110, 230);
  textSize(20);
  text(`-------------------------`, 60, 130);
  textSize(15);
}

function mapp(){
  background(red, 100, 100);
  rect(100, 200, 200, 50);
  textSize(50);
  text("Choose Map!", 40, 100);
  textSize(15);
  text("Continue!", 110, 230);
  textSize(20);
  text(`-------------------------`, 60, 130);
  textSize(15);
}

function waitt(){
  background(red, 100, 100);
  rect(100, 200, 200, 50);
  textSize(50);
  text("Wait for your oponent to choose...", 40, 100);
  textSize(15);
  //text("Continue!", 110, 230);
  textSize(20);
  text(`-------------------------`, 60, 130);
  textSize(15);
}

function startt(){
  background(red, 100, 100);
  rect(100, 200, 200, 50);
  textSize(50);
  text("START!", 40, 100);
  textSize(15);
  //text("Continue!", 110, 230);
  textSize(20);
  text(`-------------------------`, 60, 130);
  textSize(15);

}

function gameRunning(){
  background(0);
  rect(rectX,rectY,50,50);
  rect(rectX2,rectY2, 50, 50);
  movement();
  timeHandle();
}

function endGame(){
  background(red, 100, 100);
  rect(100, 200, 200, 50);
  textSize(50);
  text("GAME OVER!", 40, 100);
  textSize(15);
  //text("Continue!", 110, 230);
  textSize(20);
  text(`-------------------------`, 60, 130);
  textSize(15);
}

function timeHandle(){
  if (time2 > 0) {
    time2--;
  } else {
    gamestate1 = "gameover";
  }
}
