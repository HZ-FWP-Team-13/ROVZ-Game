import Vector2 from "./Vector2.js";
export default class Collider {
    points;
    updatedPoints;
    previousFrameRotation;
    overlap;
    constructor() {
        this.points = [];
        this.updatedPoints = [];
        this.overlap = false;
    }
    draw(ctx) {
        let vertSize = 8;
        this.updatedPoints.forEach(point => {
            ctx.fillStyle = 'blue';
            ctx.fillRect(point.x - vertSize / 2, point.y - vertSize / 2, vertSize, vertSize);
        });
    }
    updatePoints(transform) {
        for (let i = 0; i < this.points.length; i++) {
            this.updatedPoints[i].x = (this.points[i].x * Math.cos(transform.getRotationInRadians())) - (this.points[i].y * Math.sin(transform.getRotationInRadians())) + transform.position.x;
            this.updatedPoints[i].y = (this.points[i].x * Math.sin(transform.getRotationInRadians())) + (this.points[i].y * Math.cos(transform.getRotationInRadians())) + transform.position.y;
        }
    }
    addNewPoint(x, y) {
        this.points.push(new Vector2(x, y));
        this.updatedPoints.push(new Vector2(x, y));
    }
    static checkCollision(gi1, gi2) {
        let p1 = gi1.getCollider();
        let p2 = gi2.getCollider();
        let r1 = -Infinity;
        for (let i = 0; i < p1.points.length; i++) {
            let r = Math.sqrt(Math.pow(p1.points[i].x, 2) + Math.pow(p1.points[i].y, 2));
            r1 = Math.max(r1, r);
        }
        let r2 = -Infinity;
        for (let i = 0; i < p2.points.length; i++) {
            let r = Math.sqrt(Math.pow(p2.points[i].x, 2) + Math.pow(p2.points[i].y, 2));
            r2 = Math.max(r2, r);
        }
        let d = Math.sqrt(Math.pow(gi2.getXPos() - gi1.getXPos(), 2)
            + Math.pow(gi2.getYPos() - gi1.getYPos(), 2));
        if (d > r1 + r2) {
            console.log("NOT EVEN CLOSE BAYBEE");
            return false;
        }
        for (let shape = 0; shape < 2; shape++) {
            if (shape == 1) {
                p1 = gi2.getCollider();
                p2 = gi1.getCollider();
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
                for (let p = 0; p < p2.updatedPoints.length; p++) {
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