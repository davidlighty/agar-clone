import p5 from 'p5';

/**
 * Main circle class for sketch
 * 
 * @export
 * @class Circle
 */
export default class Circle {
    constructor(p, pos, r, color, i) {
        this.name = `atom.${i}`;
        console.log(`Creating ${this.name}`);
        this.p = p;
        this.r = r;
        this.pos = pos.copy();
        this.vel = p.createVector(p.random(-1, 1), p.random(-1, 1));
        this.color = color || [p.random(250), p.random(250), p.random(250)];
        this.consumed = 0;
        this.consumeRatio = 0.5;
        this.maxR = p.width / 2 * 0.25;
        this.born = p.millis();
        this.safe = p.random(100000);
        this.accel = this.p.createVector(p.random(5), p.random(5));
    }

    show() {
        this.p.fill(this.color);
        let msg = `${this.consumed}`;
        // this.p.text(msg, this.pos.x + this.textDist(), this.pos.y + this.textDist());
        this.p.ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }

    textDist() {
        return this.r - (this.r * 0.015);
    }

    update() {
        this.borders();
        // if(this.accel > 0) {
        //     this.pos.add(this.p.createVector(this.accel, this.accel));
        //     this.accel--;
        // }
        if (this.isSafe()) {
            // this.vel.add(this.accel);
            // this.accel.su
        }
        this.pos.add(this.vel);
    }

    push(otherVel) {
        console.log('push!');
        this.vel = otherVel;
        this.pos.x = this.pos.x * -1;
        this.pos.y = this.pos.y * -1;
    }

    pull(otherVel) {
        console.log('pull!');
        this.vel += otherVel;
    }

    break () {
        let num = this.p.floor(this.r / this.p.log(this.r));
        console.log(`break: ${num}`);
        return num;
    }

    clicked(x, y) {
        let d = this.p.dist(this.pos.x, this.pos.y, x, y);
        if (d < this.r) {
            console.log(`${this.name} clicked.`);
            return true;
        }
        return false;
    }

    canEat(other) {
        if (this.isSafe()) return;
        let dist = p5.Vector.dist(this.pos, other.pos);
        let sizeDiff = this.p.abs(this.r - other.r) < 0.5;
        if (dist < this.r + other.r) {
            // console.log(`diff: ${sizeDiff} : ${ this.p.abs(this.r - other.r)}`);
            // collision
            if (sizeDiff) {
                return 2;
            } else if(this.r > other.r) {
                return 1;
            }
        }

        return 0;
    }

    /**
     * Eat other circle!
     * 
     * @param {any} other
     * 
     * @memberOf Circle
     */
    eat(other) {
        if (this.r < this.maxR) {
            // console.log(`${this.name} eat! ${other.name}`);
            let newR = this.r + (other.r * this.consumeRatio)
            // console.log(`R : ${this.r} => ${newR}`);
            this.r = newR;
            this.consumed++;
            this.vel = p5.Vector.random2D();
        }
    }

    borders() {
        if (this.pos.x < -this.r) this.pos.x = this.p.width + this.r;
        if (this.pos.y < -this.r) this.pos.y = this.p.height + this.r;
        if (this.pos.x > this.p.width + this.r) this.pos.x = -this.r;
        if (this.pos.y > this.p.height + this.r) this.pos.y = -this.r;
    }

    isSafe() {
        let current = this.p.millis();
        // console.log(`lifespan: ${current}, ${this.born}, ${current-this.born}`)
        if (current - this.born < 1000) {
            return true;
        }
        return false;
    }

}