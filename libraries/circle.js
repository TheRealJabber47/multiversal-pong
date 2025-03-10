class Circle {
    constructor(x, y, r) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.movementX = random([-1, 1]) * random(2, ballSpeed);
      this.movementY = random([-1, 1]) * random(1, ballSpeed / 2);
      this.color = color(random(255), random(255), random(255));
    }
  
    move() {
      this.x += this.movementX;
      this.y += this.movementY;
      this.handleCollision();
    }
  
    handleCollision() {
      if (this.y - this.r <= 0 || this.y + this.r >= height) {
        this.movementY *= -1;
      }
      if (this.x - this.r <= 0) {
        let rColorName = ntc.name(rgbToHex(colorR[0], colorR[1], colorR[2]))
        scoreR++;
        screen = "win";
        winner = rColorName[1]+ " Wins!"
        winnerColor = colorR;
        resetBalls();
      }
      if (this.x + this.r >= width) {
        let lColorName = ntc.name(rgbToHex(colorL[0], colorL[1], colorL[2]))
        scoreL++;
        screen = "win";
        winner = lColorName[1]+ " Wins!"
        winnerColor = colorL;
        resetBalls();
      }
      if (collideRectCircle(paddleRX, paddleRY, paddleWidth, paddleHeight, this.x, this.y, this.r * 2)) {
        this.movementX *= -1;
        this.movementX += (this.movementX > 0) ? 1 : -1;
      }
      if (collideRectCircle(paddleLX, paddleLY, paddleWidth, paddleHeight, this.x, this.y, this.r * 2)) {
        this.movementX *= -1;
        this.movementX += (this.movementX > 0) ? 1 : -1;
      }
      for (let other of circles) {
        if (this != other) {
          resolveCollision(this, other, this.r * 2)
        }
      }
    }
  
    display() {
      fill(this.color);
      ellipse(this.x, this.y, this.r * 2);
    }
  }