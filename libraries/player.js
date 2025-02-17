class Player {
  constructor() {
    this.x = battleBox.x + battleBox.w / 2;
    this.y = battleBox.y + battleBox.h / 2;
    this.size = 20;
  }

  update() {
    if (keyIsDown(LEFT_ARROW) && this.x > battleBox.x) this.x -= 3;
    if (keyIsDown(RIGHT_ARROW) && this.x < battleBox.x + battleBox.w - this.size) this.x += 3;
    if (keyIsDown(UP_ARROW) && this.y > battleBox.y) this.y -= 3;
    if (keyIsDown(DOWN_ARROW) && this.y < battleBox.y + battleBox.h - this.size) this.y += 3;
  }

  show() {
    fill(0, 0, 255);
    rect(this.x, this.y, this.size, this.size);
  }
}