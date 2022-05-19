import GameItem from "../GameItem.js";
import Vector2 from "./Vector2.js";
export default class Polygon extends GameItem {
    points;
    overlap;
    constructor(xPos, yPos, rot) {
        super('', xPos, yPos, rot, 50, 50, 0);
        this.points = [];
        this.overlap = false;
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
        ctx.fillStyle = "red";
        console.log(ctx.fillStyle);
        ctx.moveTo(0, 0);
        ctx.lineTo(this.points[0].x, this.points[0].y);
        console.log(this.points[0].x, this.points[0].y);
        ctx.lineWidth = 6;
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
    addNewPoint(x, y) {
        this.points.push(new Vector2(x, y));
    }
    control() {
    }
}
//# sourceMappingURL=Polygon.js.map