import GameItem from "../GameItem.js";
import Vector2 from "./Vector2.js";
import KeyListener from "../KeyListener.js";
import Input from "../Input.js";
export default class Polygon extends GameItem {
    points;
    overlap;
    input;
    previousFrameRotation;
    updatedPoints;
    kl;
    kl_up = 38;
    kl_down = 40;
    kl_left = 37;
    kl_right = 39;
    constructor(xPos, yPos, rot) {
        super('', xPos, yPos, rot, 50, 50, 0);
        this.points = [];
        this.updatedPoints = [];
        this.overlap = false;
        this.kl = new KeyListener();
        this.input = new Input();
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
        ctx.moveTo(0, 0);
        ctx.lineTo(this.points[0].x, this.points[0].y);
        ctx.lineWidth = 6;
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
        this.updatedPoints.forEach(point => {
            ctx.fillStyle = 'blue';
            ctx.fillRect(point.x, point.y, 20, 20);
        });
    }
    control() {
        this.input.readVerticalInput();
        if (this.input.getVerticalAxis() != 0) {
            this.transform.moveRelative(0, this.input.getVerticalAxis() * 4);
        }
        this.transform.rotate(this.previousFrameRotation =
            this.input.readHorizontalInput() * 4 * this.input.getVerticalAxis());
        console.log(this.transform.position);
        this.updatePoints();
    }
    updatePoints() {
        for (let i = 0; i < this.points.length; i++) {
            this.updatedPoints[i].x = this.points[i].x + this.transform.position.x;
            this.updatedPoints[i].y = this.points[i].y + this.transform.position.y;
        }
    }
    update() {
        this.updatePoints();
    }
    addNewPoint(x, y) {
        this.points.push(new Vector2(x, y));
        this.updatedPoints.push(new Vector2(x, y));
    }
    static shapeOverlap_SAT(r1, r2) {
        let poly1 = r1;
        let poly2 = r2;
        for (let shape = 0; shape < 2; shape++) {
            if (shape == 1) {
                poly1 = r2;
                poly2 = r1;
            }
            for (let a = 0; a < poly1.updatedPoints.length; a++) {
                let b = (a + 1) % poly1.updatedPoints.length;
                let axisProj = new Vector2(-(poly1.updatedPoints[b].y - poly1.updatedPoints[a].y), poly1.updatedPoints[b].x - poly1.updatedPoints[a].x);
                let min_r1 = Infinity;
                let max_r1 = -Infinity;
                for (let p = 0; p < poly1.updatedPoints.length; p++) {
                    let dot = Vector2.dotProduct(poly1.updatedPoints[p], axisProj);
                    min_r1 = Math.min(min_r1, dot);
                    max_r1 = Math.max(max_r1, dot);
                }
                let min_r2 = Infinity;
                let max_r2 = -Infinity;
                for (let p = 0; p < poly1.updatedPoints.length; p++) {
                    let dot = Vector2.dotProduct(poly2.updatedPoints[p], axisProj);
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
        return true;
    }
}
//# sourceMappingURL=Polygon.js.map