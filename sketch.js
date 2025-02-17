// global variables
let circles = []
let paddleLX, paddleLY, paddleRX, paddleRY
let scoreL = 0, scoreR = 0
let paddleHeight = 100, paddleWidth = 25
let screen = "menu"
let screenText = 0
let begin = true
let balls = 1
let ballSize = 25
let ballSpeed = 5
let winner = ""
let colorR = [0, 255, 0]
let colorL = [0, 0, 255]
let winnerColor = [255, 255, 255]
let gameType = ["vanilla", "multiball", "laserball"]
let gameTypeIndex = 0
let shuffle = false
let LsliderR
let LsliderG
let LsliderB
let RsliderR
let RsliderG
let RsliderB
let leftPaddle, rightPaddle;
let player;
let bones = [];
let blasters = [];
let battleBox = { x: 100, y: 100, w: 300, h: 200 };
let health = 100;
let sansImage

function preload() {
  sansImage = loadImage("/assets/sans.png");
}

function setup() {
  // setup
  createCanvas(800, 600)

  player = new Player();

  leftPaddle = new PaddleShooter(30, height / 2, 5); // Left paddle shooting right
  rightPaddle = new PaddleShooter(width - 30, height / 2, -5); // Right paddle shooting left

  paddleLX = 100
  paddleRX = width - paddleLX
  paddleLY = height / 2
  paddleRY = height / 2

  LsliderR = createSlider(0, 255, 0, 1)
  LsliderR.position(100, 300)
  LsliderR.size(150)

  LsliderG = createSlider(0, 255, 0, 1)
  LsliderG.position(100, 400)
  LsliderG.size(150)

  LsliderB = createSlider(0, 255, 255, 1)
  LsliderB.position(100, 500)
  LsliderB.size(150)

  RsliderR = createSlider(0, 255, 0, 1)
  RsliderR.position(500, 300)
  RsliderR.size(150)

  RsliderG = createSlider(0, 255, 255, 1)
  RsliderG.position(500, 400)
  RsliderG.size(150)

  RsliderB = createSlider(0, 255, 0, 1)
  RsliderB.position(500, 500)
  RsliderB.size(150)

  LsliderR.hide()
  LsliderG.hide()
  LsliderB.hide()
  RsliderR.hide()
  RsliderG.hide()
  RsliderB.hide()
}

function draw() {
  // sets screen based on variable state
  if (screen == "settings") {
    drawSettingsMenu()
  } else if (screen == "menu") {
    drawMenu()
    drawSettingsButton()
    if(collidePointRect(mouseX, mouseY,10, 10, 30, 30))
    drawSansButton()
  } else if (screen == "multiball") {
    multiBall()
  } else if (screen == "vanilla") {
    vanilla()
  } else if (screen == "win") {
    drawWinScreen()
  } else if (screen == "rgbpicker") {
    rgbPicker()
  } else if (screen == "laserball") {
    laserBall()
  } else if (screen == "sans") {
    sans()
  }
}

function drawMenu() {
  //main menu
  paddleLY = height / 2
  paddleRY = height / 2
  background(0)
  fill(255)
  textSize(35)
  textAlign(CENTER)
  text("Multiversal Pong", width / 2, height / 4)

  let buttonX = width / 3
  let buttonY = height / 2
  let buttonWidth = width / 3
  let buttonHeight = height / 8
  rect(buttonX, buttonY, buttonWidth, buttonHeight, 15)
  fill(0)
  text("Play", width / 2, height / 1.75)

  if (collidePointRect(mouseX, mouseY, buttonX, buttonY, buttonWidth, buttonHeight) && mouseIsPressed) {
    screen = gameType[gameTypeIndex]
    screenText = 0
    scoreL = 0
    scoreR = 0
    begin = true
  }
}

function multiBall() {
  // multi ball map
  background(220)
  balls = Math.floor(random(2, 5))

  if (begin) {
    circles = []
    for (let i = 0; i < balls; i++) {
      circles.push(new Circle(random(width / 3, width * 2 / 3), random(height / 3, height * 2 / 3), ballSize))
    }
    begin = false
  }

  for (let circle of circles) {
    circle.move()
    circle.display()
  }

  scoreboard()
  paddles()
}

function vanilla() {
  //normal map
  background(220)
  balls = 1
  if (begin) {
    circles = []
    for (let i = 0; i < balls; i++) {
      circles.push(new Circle(random(width / 4, width * 3 / 4), random(height / 4, height * 3 / 4), ballSize))
    }
    begin = false
  }

  for (let circle of circles) {
    circle.move()
    circle.display()
  }

  scoreboard()
  paddles()
}

function drawWinScreen() {
  //win screen
  background(winnerColor)
  fill(0)
  textSize(50)
  textAlign(CENTER)
  text(winner, width / 2, height / 2 - 50)
  textSize(30)
  text("Final Score: " + scoreL + " - " + scoreR, width / 2, height / 2)

  let buttonX = width / 3, buttonY = (height * 2) / 3
  let buttonWidth = width / 3, buttonHeight = height / 8
  fill(255)
  rect(buttonX, buttonY, buttonWidth, buttonHeight, 15)
  fill(0)
  text("Menu", width / 2, height / 1.35)

  if (screen == "win" && collidePointRect(mouseX, mouseY, buttonX, buttonY, buttonWidth, buttonHeight) && mouseIsPressed) {
    screen = "menu"
    begin = true
  }
}

function drawSettingsButton() {
  //settings button
  fill(100)
  rect(width - 40, 10, 30, 30, 5)
  fill(255)
  textSize(20)
  textAlign(CENTER, CENTER)
  text("⚙️", width - 24, 26)
}

function drawSansButton(){
  //sans button
  sansImage.resize(25,25)
  image(sansImage, 12.5, 12.5)

}

function drawSettingsMenu() {
  let style = ""
  style = shuffle ? "random" : "pick"
  background(50)
  fill(255)
  textSize(30)
  textAlign(CENTER)
  text("Settings", width / 2, 50)

  //color button
  fill(180)
  rect(width - 110, height - 110, 100, 100, 25)
  textSize(50)
  text("🎨", width - 60, height - 55)

  //game style text
  textSize(20)
  fill(255)
  text("Game Style: " + style, width / 2, 145)

  //game style buttons
  fill(0)
  rect(width * 3 / 4 - 15, 130, 30, 30, 5)
  rect(width / 4 - 15, 130, 30, 30, 5)
  fill(255)
  text("▶", width * 3 / 4, 145)
  text("◀", width / 4, 145)

  //back button
  fill(180)
  rect(width / 2 - 60, 400, 120, 40, 10)
  fill(0)
  textSize(20)
  text("Back", width / 2, 425)



  if (shuffle) {
  } else {
    //game option buttons and text
    fill(0)
    rect(width * 3 / 4 - 15, 175, 30, 30, 5)
    rect(width / 4 - 15, 175, 30, 30, 5)

    fill(255)
    text("▶", width * 3 / 4, 190)
    text("◀", width / 4, 190)

    text("Gamemode type: " + gameType[gameTypeIndex], width / 2, 190)
  }
}

function mousePressed() {
  if (screen == "settings") {
    if (collidePointRect(mouseX, mouseY, width / 4 - 15, 175, 30, 30)) {
      //left game type
      if (gameTypeIndex < gameType.length - 1) {
        gameTypeIndex++
      }
    } else if (collidePointRect(mouseX, mouseY, width * 3 / 4 - 15, 175, 30, 30)) {
      //right game type
      if (gameTypeIndex > 0) {
        gameTypeIndex--
      }
    } else if (collidePointRect(mouseX, mouseY, width * 3 / 4 - 15, 130, 30, 30)) {
      //swaps state of the shuffle option
      shuffle = !shuffle
    } else if (collidePointRect(mouseX, mouseY, width / 4 - 15, 130, 30, 30)) {
      //swaps state of the shuffle option
      shuffle = !shuffle
    } else if (collidePointRect(mouseX, mouseY, width / 2 - 60, 400, 120, 40)) {
      //back button for the settings menu
      screen = "menu"
    } else if (collidePointRect(mouseX, mouseY, width - 110, height - 110, 100, 100)) {
      //color button
      screen = "rgbpicker"
      rgbPicker()
    }
  }
  if (screen == "menu") {
    if (collidePointRect(mouseX, mouseY, width - 40, 10, 30, 30)) {
      //opens settings
      screen = "settings"
    }
    if (collidePointRect(mouseX, mouseY, 10, 10, 30, 30)) {
      //opens settings
      screen = "sans"
    }
  }
  if (screen == "rgbpicker") {
    if (collidePointRect(mouseX, mouseY, width / 2 - 60, 505, 120, 40)) {
      screen = "settings"
      LsliderR.hide()
      LsliderG.hide()
      LsliderB.hide()
      RsliderR.hide()
      RsliderG.hide()
      RsliderB.hide()
    }
  }
}

function resetBalls() {
  //post round reset
  circles = []
  for (let i = 0; i < balls; i++) {
    circles.push(new Circle(width / 2, height / 2, ballSize))
  }
}

function paddles() {
  //paddle setup
  fill(colorR)
  rect(paddleRX, paddleRY, paddleWidth, paddleHeight)
  fill(colorL)
  rect(paddleLX, paddleLY, paddleWidth, paddleHeight)

  // Left paddle movement (W and S)
  if (keyIsDown(87) && paddleLY > 0) { // W key
    paddleLY -= 10
  }
  if (keyIsDown(83) && paddleLY < height - paddleHeight) { // S key
    paddleLY += 10
  }

  // Right paddle movement (Arrow keys)
  if (keyIsDown(UP_ARROW) && paddleRY > 0) {
    paddleRY -= 10
  }
  if (keyIsDown(DOWN_ARROW) && paddleRY < height - paddleHeight) {
    paddleRY += 10
  }
}

function scoreboard() {
  //scoreboard setup
  fill(0)
  textSize(45)
  textAlign(CENTER)
  text("Score\n" + scoreL + " - " + scoreR, width / 2, height / 11)
}

function resolveCollision(thisObj, otherObj, mindistance) {
  //ball x ball collision
  let dx = otherObj.x - thisObj.x
  let dy = otherObj.y - thisObj.y
  let distance = dist(thisObj.x, thisObj.y, otherObj.x, otherObj.y)
  let minDistance = mindistance

  if (distance < minDistance) {
    let overlap = minDistance - distance
    let angle = atan2(dy, dx)

    // Push each circle away equally
    let moveX = (overlap / 2) * cos(angle)
    let moveY = (overlap / 2) * sin(angle)

    thisObj.x -= moveX
    thisObj.y -= moveY
    otherObj.x += moveX
    otherObj.y += moveY


  }
}

function rgbToHex(r, g, b) {
  //rgb to hex, made for displaying the color
  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)
}

function rgbPicker() {
  let Lr = LsliderR.value()
  let Lg = LsliderG.value()
  let Lb = LsliderB.value()

  let Rr = RsliderR.value()
  let Rg = RsliderG.value()
  let Rb = RsliderB.value()

  //set color
  colorL = [Lr, Lg, Lb]
  colorR = [Rr, Rg, Rb]

  let rColorName = ntc.name(rgbToHex(colorR[0], colorR[1], colorR[2]))
  let lColorName = ntc.name(rgbToHex(colorL[0], colorL[1], colorL[2]))

  //show slider
  LsliderR.show()
  LsliderG.show()
  LsliderB.show()
  RsliderR.show()
  RsliderG.show()
  RsliderB.show()

  fill(Lr, Lg, Lb)
  rect(0, 0, width / 2, height)
  fill(Rr, Rg, Rb)
  rect(width / 2, 0, width, height)

  //back button
  fill(180)
  rect(width / 2 - 60, 505, 120, 40, 10)
  fill(0)
  textSize(20)
  text("Back", width / 2, 525)

  //displays color name
  textAlign(CENTER)
  textSize(40)

  if (Lr < 100 && Lg < 125 && Lb < 125) {
    fill(255);
  } else {
    fill(0);
  }
  text(lColorName[1], 175, 100)

  if (Rr < 100 && Rg < 125 && Rb < 125) {
    fill(255);
  } else {
    fill(0);
  }
  text(rColorName[1], 575, 100)
}

function laserBall() {
  background(0);
  fill(colorL)
  leftPaddle.display();
  fill(colorR)
  rightPaddle.display();
  leftPaddle.updateProjectiles();
  rightPaddle.updateProjectiles();

  // Left paddle movement (W/S keys)
  if (keyIsDown(87)) { // 'W' key
    leftPaddle.move(-1);
  }
  if (keyIsDown(83)) { // 'S' key
    leftPaddle.move(1);
  }

  // Right paddle movement (UP/DOWN arrow keys)
  if (keyIsDown(UP_ARROW)) {
    rightPaddle.move(-1);
  }
  if (keyIsDown(DOWN_ARROW)) {
    rightPaddle.move(1);
  }

}

function laser() {

}

function keyPressed() {
  if (key === 'D' || key === 'd') {
    leftPaddle.shoot(); // Left paddle shoots with 'D'
  }
  if (keyCode === LEFT_ARROW) {
    rightPaddle.shoot(); // Right paddle shoots with left arrow key
  }
}

function sans() {
  background(0);
  drawBattleBox();
  player.update();
  player.show();

  // Handle bones
  if (frameCount % 60 === 0) {
    bones.push(new Bone(random(battleBox.x, battleBox.x + battleBox.w), battleBox.y));
  }
  for (let i = bones.length - 1; i >= 0; i--) {
    bones[i].update();
    bones[i].show();
    if (bones[i].hits(player)) {
      health -= 5;
    }
    if (bones[i].offscreen()) {
      bones.splice(i, 1);
    }
  }

  // Handle blasters
  if (frameCount % 180 === 0) {
    blasters.push(new Blaster(battleBox.x, random(battleBox.y, battleBox.y + battleBox.h)));
  }
  for (let i = blasters.length - 1; i >= 0; i--) {
    blasters[i].update();
    blasters[i].show();
    if (blasters[i].hits(player)) {
      health -= 10;
    }
    if (blasters[i].offscreen()) {
      blasters.splice(i, 1);
    }
  }

  drawHealth();
}


function drawBattleBox() {
  noFill();
  stroke(255);
  rect(battleBox.x, battleBox.y, battleBox.w, battleBox.h);
}

function drawHealth() {
  fill(255, 0, 0);
  rect(10, 10, health * 2, 10);
}
