import Component from "../CoreModule/Component.js";
import Mathematics from "../MathModule/Mathematics.js";
import Vector2 from "../MathModule/Vector2.js";
export default class Collider extends Component {
    points;
    _updatedPoints;
    get updatedPoints() {
        return this._updatedPoints;
    }
    set updatedPoints(value) {
        this._updatedPoints = value;
    }
    previousFrameRotation;
    overlap;
    constructor() {
        super("collider");
        this.points = [];
        this.updatedPoints = [];
        this.overlap = false;
    }
    draw(ctx, camera) {
        let vertSize = 8;
        this.updatedPoints.forEach(point => {
            ctx.fillStyle = 'blue';
            ctx.fillRect(point.x - vertSize / 2 - camera.transform.position.x + camera.frameDimensions.x / 2, point.y - vertSize / 2 - camera.transform.position.y + camera.frameDimensions.y / 2, vertSize, vertSize);
        });
        console.log('DRAW');
    }
    updatePoints(transform) {
        for (let i = 0; i < this.points.length; i++) {
            this.updatedPoints[i].x = (this.points[i].x * Math.cos(Mathematics.radians(transform.rotation))) -
                (this.points[i].y * Math.sin(Mathematics.radians(transform.rotation))) + transform.position.x;
            this.updatedPoints[i].y = (this.points[i].x * Math.sin(Mathematics.radians(transform.rotation))) +
                (this.points[i].y * Math.cos(Mathematics.radians(transform.rotation))) + transform.position.y;
        }
    }
    addNewPoint(x, y) {
        this.points.push(new Vector2(x, y));
        this.updatedPoints.push(new Vector2(x, y));
    }
    static checkCollision(gi1, collider1, gi2, collider2) {
        let g1 = gi1;
        let c1 = collider1;
        let g2 = gi2;
        let c2 = collider2;
        let r1 = -Infinity;
        for (let i = 0; i < c1.points.length; i++) {
            let r = Math.sqrt(Math.pow(c1.points[i].x, 2) + Math.pow(c1.points[i].y, 2));
            r1 = Math.max(r1, r);
        }
        let r2 = -Infinity;
        for (let i = 0; i < c2.points.length; i++) {
            let r = Math.sqrt(Math.pow(c2.points[i].x, 2) + Math.pow(c2.points[i].y, 2));
            r2 = Math.max(r2, r);
        }
        let d = Math.sqrt(Math.pow(gi2.transform.position.x - gi1.transform.position.x, 2)
            + Math.pow(gi2.transform.position.y - gi1.transform.position.y, 2));
        if (d > r1 + r2) {
            return false;
        }
        for (let shape = 0; shape < 2; shape++) {
            if (shape == 1) {
                g1 = gi2;
                c1 = collider2;
                g2 = gi1;
                c2 = collider1;
            }
            for (let a = 0; a < c1.updatedPoints.length; a++) {
                let b = (a + 1) % c1.updatedPoints.length;
                let axisProj = new Vector2(-(c1.updatedPoints[b].y - c1.updatedPoints[a].y), c1.updatedPoints[b].x - c1.updatedPoints[a].x);
                let min_p1 = Infinity;
                let max_p1 = -Infinity;
                for (let p = 0; p < c1.updatedPoints.length; p++) {
                    let dot = Vector2.dotProduct(c1.updatedPoints[p], axisProj);
                    min_p1 = Math.min(min_p1, dot);
                    max_p1 = Math.max(max_p1, dot);
                }
                let min_c2 = Infinity;
                let max_c2 = -Infinity;
                for (let p = 0; p < c2.updatedPoints.length; p++) {
                    let dot = Vector2.dotProduct(c2.updatedPoints[p], axisProj);
                    min_c2 = Math.min(min_c2, dot);
                    max_c2 = Math.max(max_c2, dot);
                }
                if (!(max_c2 >= min_p1 && max_p1 >= min_c2)) {
                    c1.overlap = false;
                    return false;
                }
            }
        }
        c1.overlap = true;
        return true;
    }
    clearPoints() {
        this.points = [];
        this.updatedPoints = [];
    }
    generateRectCollider(width, height) {
        this.clearPoints();
        this.addNewPoint(-width / 2, -height / 2);
        this.addNewPoint(width / 2, -height / 2);
        this.addNewPoint(width / 2, height / 2);
        this.addNewPoint(-width / 2, height / 2);
    }
}
//# sourceMappingURL=Collider.js.map