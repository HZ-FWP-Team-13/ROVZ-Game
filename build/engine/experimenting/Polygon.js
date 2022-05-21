import GameItem from "../GameItem.js";
import Vector2 from "./Vector2.js";
import Input from "../Input.js";
export default class Polygon extends GameItem {
    points;
    updatedPoints;
    previousFrameRotation;
    overlap;
    input;
    constructor(xPos, yPos, rot) {
        super('', xPos, yPos, rot, 50, 50, 0);
        this.points = [];
        this.updatedPoints = [];
        this.overlap = false;
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
    }
    updatePoints() {
        for (let i = 0; i < this.points.length; i++) {
            console.log(this.transform.orientation);
            this.updatedPoints[i].x = (this.points[i].x * Math.cos(this.transform.getRotationInRadians())) - (this.points[i].y * Math.sin(this.transform.getRotationInRadians())) + this.transform.position.x;
            this.updatedPoints[i].y = (this.points[i].x * Math.sin(this.transform.getRotationInRadians())) + (this.points[i].y * Math.cos(this.transform.getRotationInRadians())) + this.transform.position.y;
        }
    }
    update() {
        this.updatePoints();
    }
    addNewPoint(x, y) {
        this.points.push(new Vector2(x, y));
        this.updatedPoints.push(new Vector2(x, y));
    }
    static shapeOverlap_SAT(poly1, poly2) {
        let p1 = poly1;
        let p2 = poly2;
        for (let shape = 0; shape < 2; shape++) {
            if (shape == 1) {
                p1 = poly2;
                p2 = poly1;
            }
            for (let a = 0; a < p1.updatedPoints.length; a++) {
                let b = (a + 1) % p1.updatedPoints.length;
                let axisProj = new Vector2(-(p1.updatedPoints[b].y - p1.updatedPoints[a].y), p1.updatedPoints[b].x - p1.updatedPoints[a].x);
                let min_p1 = Infinity;
                let max_p1 = -Infinity;
                for (let p = 0; p < p1.updatedPoints.length; p++) {
                    let dot = Vector2.dotProduct(p1.updatedPoints[p], axisProj);
                    min_p1 = Math.min(min_p1, dot);
                    max_p1 = Math.max(max_p1, dot);
                }
                let min_p2 = Infinity;
                let max_p2 = -Infinity;
                for (let p = 0; p < p1.updatedPoints.length; p++) {
                    let dot = Vector2.dotProduct(p2.updatedPoints[p], axisProj);
                    min_p2 = Math.min(min_p2, dot);
                    max_p2 = Math.max(max_p2, dot);
                }
                if (!(max_p2 >= min_p1 && max_p1 >= min_p2)) {
                    p1.overlap = false;
                    return false;
                }
            }
        }
        p1.overlap = true;
        return true;
    }
}
//# sourceMappingURL=Polygon.js.map