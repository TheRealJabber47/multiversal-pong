class Projectile {
  constructor(x, y, speedX) {
    this.x = x; // X position of the projectile
    this.y = y; // Y position of the projectile
    this.speedX = speedX; // Speed at which the projectile moves horizontally
    this.radius = 5; // Radius of the projectile
  }

  update() {
    this.x += this.speedX; // Move the projectile horizontally
  }

  display() {
    fill(255, 0, 0); // Set color to red
    ellipse(this.x, this.y, this.radius * 2); // Draw the projectile
  }

  isOffScreen() {
    return this.x < 0 || this.x > width; // Check if the projectile is off the screen
  }
}
