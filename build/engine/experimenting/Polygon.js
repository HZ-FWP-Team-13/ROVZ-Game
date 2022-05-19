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
    }
    static shapeOverlap_SAT(poly1, poly2) {
    }
}
//# sourceMappingURL=Polygon.js.map