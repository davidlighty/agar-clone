import p5 from 'p5';
import Circle from './circle';

const sketch = (p) => {

    let circles = [];
    let startCount = 160;
    let bgColor = 0;
    let player;

    p.addMore = (qty, pos) => {
        let randomPos = false;
        if (!pos) randomPos = true;
        for (var i = 0; i < qty; i++) {
            let r = p.random(10);
            if (randomPos) {
                console.log('new pos');
                let w = p.random(p.width);
                let h = p.random(p.height);
                pos = p.createVector(w, h);
            }
            circles.push(new Circle(p, pos, r, null, i + 1));
        }
    }

    p.setup = () => {
        let width = window.innerWidth-50;
        let height = window.innerHeight-50;
        p.createCanvas(width, height);
        // player = new Circle(p, p.createVector(p.width/2,p.height/2),25,[255,255,255],0);

        p.addMore(startCount, null);


    }

    p.draw = () => {
        p.background(bgColor);

        // player.show();
        // player.update();

        for (var i = circles.length - 1; i > 0; i--) {
            circles[i].show();
            circles[i].update();
        }

        for (var i = circles.length - 1; i > 0; i--) {
            for (var j = circles.length - 1; j > 0; j--) {
                if (j !== i && circles[j] && circles[i]) {
                    let answer = circles[i].canEat(circles[j]);
                    if (answer > 0) {
                        if (answer === 1) {
                            circles[i].eat(circles[j]);
                            circles.splice(j, 1);
                        } else {
                            console.log('break');
                            p.addMore(circles[i].break(), circles[i].pos);
                            circles.splice(i, 1);
                            p.addMore(circles[j].break(), circles[j].pos);
                            circles.splice(j, 1);
                        }
                    }
                }
            }
        }

        if (circles.length < startCount / 4) {
            p.addMore(startCount / 6);
        }
    }

    p.mousePressed = () => {
        console.log('Mouse Pressed');
        for (var i = circles.length - 1; i > 0; i--) {
            if (circles[i].clicked(p.mouseX, p.mouseY)) {
                p.addMore(circles[i].break(), circles[i].pos);
                circles.splice(i, 1);
            }
        }
    }
}

export default class Render {
    constructor(ele) {
        new p5(sketch);
    }
}