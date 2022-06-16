import Component from '../CoreModule/Component.js';
import Mathematics from '../MathModule/Mathematics.js';
import Vector2 from '../MathModule/Vector2.js';
export default class Collider extends Component {
    points;
    updatedPoints;
    previousFrameRotation;
    overlap;
    constructor() {
        super('collider');
        this.points = [];
        this.updatedPoints = [];
        this.overlap = false;
    }
    draw(ctx, camera) {
        const vertSize = 8;
        const cameraPosition = camera.getTransform().getPosition();
        const cameraDimensions = camera.getFrameDimensions();
        const normalizedCameraX = -cameraPosition.getX() + cameraDimensions.getX() / 2;
        const normalizedCameraY = -cameraPosition.getY() + cameraDimensions.getY() / 2;
        this.updatedPoints.forEach((point) => {
            ctx.fillStyle = 'blue';
            ctx.fillRect(point.getX() - vertSize / 2 + normalizedCameraX, point.getY() - vertSize / 2 + normalizedCameraY, vertSize, vertSize);
        });
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        for (let i = 0; i < this.updatedPoints.length; i++) {
            ctx.lineTo(this.updatedPoints[i].getX() + normalizedCameraX, this.updatedPoints[i].getY() + normalizedCameraY);
        }
        ctx.lineTo(this.updatedPoints[0].getX() + normalizedCameraX, this.updatedPoints[0].getY() + normalizedCameraY);
        ctx.stroke();
        ctx.closePath();
    }
    updatePoints(transform) {
        for (let i = 0; i < this.points.length; i++) {
            const transformRotation = -Mathematics.radians(transform.getRotation());
            let newX = (this.points[i].getX() * Math.cos(transformRotation));
            newX -= this.points[i].getY() * Math.sin(transformRotation) + transform.getPosition().getX();
            let newY = (this.points[i].getX() * Math.sin(transformRotation));
            newY += this.points[i].getY() * Math.cos(transformRotation) + transform.getPosition().getY();
            this.updatedPoints[i].setX(-newX);
            this.updatedPoints[i].setY(newY);
        }
    }
    addNewPoint(x, y) {
        this.points.push(new Vector2(x, y));
        this.updatedPoints.push(new Vector2(x, y));
    }
    static checkCollision(gi1, gi2) {
        let c1 = gi1.getCollider();
        let c2 = gi2.getCollider();
        let r1 = -Infinity;
        for (let i = 0; i < c1.points.length; i++) {
            const r = Math.sqrt((c1.points[i].getX() ** 2) + (c1.points[i].getY() ** 2));
            r1 = Math.max(r1, r);
        }
        let r2 = -Infinity;
        for (let i = 0; i < c2.points.length; i++) {
            const r = Math.sqrt((c2.points[i].getX() ** 2) + (c2.points[i].getX() ** 2));
            r2 = Math.max(r2, r);
        }
        const d = Math.sqrt(((gi2.getTransform().getPosition().getX() - gi1.getTransform().getPosition().getX()) ** 2)
            + ((gi2.getTransform().getPosition().getX() - gi1.getTransform().getPosition().getX() ** 2)));
        if (d > r1 + r2) {
            return false;
        }
        for (let shape = 0; shape < 2; shape++) {
            if (shape === 1) {
                c1 = gi2.getCollider();
                c2 = gi1.getCollider();
            }
            for (let a = 0; a < c1.updatedPoints.length; a++) {
                const b = (a + 1) % c1.updatedPoints.length;
                const axisProj = new Vector2(-(c1.updatedPoints[b].getY() - c1.updatedPoints[a].getY()), c1.updatedPoints[b].getX() - c1.updatedPoints[a].getX());
                let minP1 = Infinity;
                let maxP1 = -Infinity;
                for (let p = 0; p < c1.updatedPoints.length; p++) {
                    const dot = Vector2.dotProduct(c1.updatedPoints[p], axisProj);
                    minP1 = Math.min(minP1, dot);
                    maxP1 = Math.max(maxP1, dot);
                }
                let minC2 = Infinity;
                let maxC2 = -Infinity;
                for (let p = 0; p < c2.updatedPoints.length; p++) {
                    const dot = Vector2.dotProduct(c2.updatedPoints[p], axisProj);
                    minC2 = Math.min(minC2, dot);
                    maxC2 = Math.max(maxC2, dot);
                }
                if (!(maxC2 >= minP1 && maxP1 >= minC2)) {
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
    getUpdatedPoints() {
        return this.updatedPoints;
    }
    setUpdatedPoints(value) {
        this.updatedPoints = value;
    }
}
//# sourceMappingURL=Collider.js.map