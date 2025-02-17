class Boss {
    constructor() {
      this.x = width / 2;
      this.y = 50;
      this.size = 40;
      this.timer = 0;
    }
    
    update() {
      this.x += sin(frameCount * 0.05) * 2;
      this.timer += 2;
      if (this.timer % 60 === 0) {
        this.attack();
      }
    }
    
    display() {
      fill(255, 0, 0);
      ellipse(this.x, this.y, this.size);
    }
    
    attack() {
      let attackType = floor(random(5));
      if (attackType === 0) {
        for (let i = 0; i < 5; i++) {
          projectiles.push(new Projectile(this.x, this.y, random(-2, 2), 3));
        }
      } else if (attackType === 1) {
        projectiles.push(new Projectile(this.x, this.y, 0, 5));
      } else if (attackType === 2) {
        for (let angle = 0; angle < TWO_PI; angle += PI / 4) {
          projectiles.push(new Projectile(this.x, this.y, cos(angle) * 3, sin(angle) * 3));
        }
      } else if (attackType === 3) {
        for (let i = 0; i < 10; i++) {
    blasters.push(new Blaster(random([0, width]), random(height), random([-3, 3])));
  }
      } else {
        for (let i = 0; i < 10; i++) {
    bones.push(new Bone(random(width), 0, 4));
  }
      }
    }
  }
  