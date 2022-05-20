import GameItem from "../GameItem.js";
import Vector2 from "./Vector2.js";
import KeyListener from "../KeyListener.js";
export default class Polygon extends GameItem {
    points;
    overlap;
    previousFrameRotation;
    kl;
    kl_up = 38;
    kl_down = 40;
    kl_left = 37;
    kl_right = 39;
    constructor(xPos, yPos, rot) {
        super('', xPos, yPos, rot, 50, 50, 0);
        this.points = [];
        this.overlap = false;
        this.kl = new KeyListener();
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.transform.position.x, this.transform.position.y);
        ctx.rotate(this.transform.getRotationInRadians());
        ctx.beginPath();
        if (this.overlap) {
            ctx.fillStyle = 'red';
        }
        else {
            ctx.fillStyle = 'black';
        }
        this.points.forEach(point => {
            ctx.lineTo(point.x, point.y);
        });
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.strokeStyle = "red";
        console.log(ctx.fillStyle);
        ctx.moveTo(0, 0);
        ctx.lineTo(this.points[0].x, this.points[0].y);
        console.log(this.points[0].x, this.points[0].y);
        ctx.lineWidth = 6;
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
    control() {
        if (this.kl.isKeyDown(this.kl_up)) {
            this.transform.moveRelative(0, 3);
        }
        if (this.kl.isKeyDown(this.kl_down)) {
            this.transform.moveRelative(0, -3);
        }
        if (this.kl.isKeyDown(this.kl_left)) {
            this.transform.rotate(this.previousFrameRotation =
                -3);
        }
        if (this.kl.isKeyDown(this.kl_right)) {
            this.transform.rotate(this.previousFrameRotation =
                3);
        }
    }
    addNewPoint(x, y) {
        this.points.push(new Vector2(x, y));
        console.log(this.points);
    }
    static shapeOverlap_SAT(r1, r2) {
        let poly1 = r1;
        let poly2 = r2;
        for (let shape = 0; shape < 2; shape++) {
            if (shape == 1) {
                poly1 = r2;
                poly2 = r1;
            }
            for (let a = 0; a < poly1.points.length; a++) {
                let b = (a + 1) % poly1.points.length;
                let axisProj = new Vector2(-(poly1.points[b].y - poly1.points[a].y), poly1.points[b].x - poly1.points[a].x);
                let min_r1 = Infinity;
                let max_r1 = -Infinity;
                for (let p = 0; p < poly1.points.length; p++) {
                    let dot = Vector2.dotProduct(poly1.points[p], axisProj);
                    min_r1 = Math.min(min_r1, dot);
                    max_r1 = Math.max(max_r1, dot);
                    console.log(`MIN R1: ${min_r1}, MAX R1: ${min_r1}`);
                }
                let min_r2 = Infinity;
                let max_r2 = -Infinity;
                for (let p = 0; p < poly1.points.length; p++) {
                    let dot = Vector2.dotProduct(poly2.points[p], axisProj);
                    min_r2 = Math.min(min_r2, dot);
                    max_r2 = Math.max(max_r2, dot);
                }
                if (!(max_r2 >= min_r1 && max_r1 >= min_r2)) {
                    poly1.overlap = false;
                    return false;
                }
            }
        }
        poly1.overlap = true;
        console.log(true);
        return true;
    }
}
//# sourceMappingURL=Polygon.js.map