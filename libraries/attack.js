class Attack {
    constructor(x, y, xSpeed, ySpeed, type) {
      this.x = x;
      this.y = y;
      this.xSpeed = xSpeed;
      this.ySpeed = ySpeed;
      this.type = type;
      this.size = type === 'bone' ? 20 : 30;
    }
    
    update() {
        this.y += this.ySpeed;
        this.x += this.xSpeed;
    }
    
    display() {
      if (this.type === 'bone') {
        fill(255);
        rect(this.x, this.y, this.size, this.size * 2);
      } else if (this.type === 'blaster'){
        fill(0, 0, 255);
        rect(this.x, this.y, this.size, 10);
      } else if (this.type === 'spray'){
        fill(255,255,0);
        circle(this.x, this.y, 10);
      }
    }
    
    offscreen() {
      return this.y > height || this.x < 0 || this.x > width;
    }
  }
  