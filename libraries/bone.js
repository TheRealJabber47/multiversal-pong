class Bone {
  constructor(x, y, vy) {
    this.x = x;
    this.y = y;
    this.vy = vy;
    this.size = 20;
  }
  
  update() {
    this.y += this.vy;
  }
  
  display() {
    fill(255);
    rect(this.x, this.y, this.size, this.size * 2);
  }
}
