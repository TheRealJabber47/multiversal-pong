class Projectile {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.size = 10;
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
  }
  
  display() {
    fill(255, 255, 0);
    ellipse(this.x, this.y, this.size);
  }
  
  offscreen() {
    return this.y > height || this.x < 0 || this.x > width;
  }
}