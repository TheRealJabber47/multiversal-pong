class PaddleShooter {
  constructor(x, y, speedX) {
    this.x = x; // X position of the paddle
    this.y = y; // Y position of the paddle
    this.width = 10; // Paddle width (narrow like a Pong paddle)
    this.height = 100; // Paddle height
    this.projectiles = []; // Array to store projectiles
    this.speedX = speedX; // Direction of projectile movement
  }

  move(dir) {
    this.y += dir * 10; // Move paddle up or down
    this.y = constrain(this.y, this.height / 2, height - this.height / 2); // Keep paddle within screen bounds
  }

  shoot() {
    this.projectiles.push(new Projectile(this.x + this.speedX * 2, this.y, this.speedX)); // Adjust starting position for correct direction
  }

  updateProjectiles() {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      this.projectiles[i].update(); // Update projectile position
      if (this.projectiles[i].isOffScreen()) {
        this.projectiles.splice(i, 1); // Remove projectiles that go off-screen
      }
    }
  }

  display() {
    fill(0, 0, 255); // Set paddle color to blue
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height); // Draw the paddle
    
    for (let proj of this.projectiles) {
      proj.display(); // Draw each projectile
    }
  }
}