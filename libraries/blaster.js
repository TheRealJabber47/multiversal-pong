class Blaster {
  constructor(x, y, vx) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.size = 30;
  }
  
  update() {
    this.x += this.vx;
  }
  
  display() {
    fill(0, 0, 255);
    rect(this.x, this.y, this.size, 10);
  }
}
