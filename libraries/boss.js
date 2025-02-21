class Boss {
  constructor() {
    this.x = width / 2;
    this.y = 50;
    this.size = 40;
    this.timer = 0;
    
  }

  update() {
    this.x += sin(frameCount * 0.05) * 2;
    this.timer++;
    if (this.timer % 60 === 0) {
      this.attack();
    }
  }

  display() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.size);
  }

  attack() {
    for (let i = 0; i < 10; i++) {
      attacks.push(new Attack(random(width), 0, 0, random(2, 5), 'bone'));
      attacks.push(new Attack(random([0, width]), random(height), random(-3, 3), 0, 'blaster'));
      attacks.push(new Attack(boss.x, boss.y, random(-3, 3), random(1, 3), 'spray'));
    }

  }
}
