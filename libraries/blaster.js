class Blaster {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 30;
    this.speed = 5;
  }

  update() {
    this.x += this.speed;
  }

  show() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.w, this.h);
  }

  hits(player) {
    return (
      player.x < this.x + this.w &&
      player.x + player.size > this.x &&
      player.y < this.y + this.h &&
      player.y + player.size > this.y
    );
  }

  offscreen() {
    return this.x > width;
  }
}
