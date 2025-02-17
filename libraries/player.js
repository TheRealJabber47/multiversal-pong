class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 40;
    this.size = 20;
  }
  
  update() {
    if (keyIsDown(LEFT_ARROW)) this.x -= 5;
    if (keyIsDown(RIGHT_ARROW)) this.x += 5;
    if (keyIsDown(UP_ARROW)) this.y -= 5;
    if (keyIsDown(DOWN_ARROW)) this.y += 5;
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }
  
  display() {
    fill(0, 255, 0);
    ellipse(this.x, this.y, this.size);
  }
  
  collides(obj) {
    return dist(this.x, this.y, obj.x, obj.y) < this.size / 2 + obj.size / 2;
  }
}
