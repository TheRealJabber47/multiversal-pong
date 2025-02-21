class Spray {
    constructor(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
        this.r = 25
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
    }

    display() {
        fill(0, 0, 255);
        circle(this.x, this.y, this.r);
    }
}



