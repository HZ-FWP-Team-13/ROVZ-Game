import GamePawn from '../../engine/ObjectModule/GamePawn.js';
import Transform from '../../engine/ComponentsModule/Transform.js';
import Vector2 from '../../engine/MathModule/Vector2.js';
import Mathematics from '../../engine/MathModule/Mathematics.js';
export default class Car extends GamePawn {
    speed;
    speedRange;
    targetSpeed;
    acceleration;
    path;
    lastPassedPointIndex;
    constructor(id, path, startPoint, mesh, collider) {
        const transform = new Transform(path.getPoints()[startPoint], 0, new Vector2(1, 1));
        super(id, transform, mesh, collider);
        this.path = path;
        this.speed = 300;
        this.lastPassedPointIndex = startPoint;
    }
    update(elapsed) {
        const points = this.path.getPoints();
        const i = this.lastPassedPointIndex;
        const j = (i + 1) % points.length;
        const a = points[i];
        const b = points[(j) % points.length];
        const ab = Vector2.magnitude(Vector2.vectorDifference(b, a));
        const c = Vector2.magnitude(Vector2.vectorDifference(this.getTransform().getPosition(), a));
        if (c > ab) {
            const k = (j + 1) % points.length;
            this.getTransform().setPosition(b);
            const u = new Vector2(points[k].getX() - points[j].getX(), points[k].getY() - points[j].getY());
            const v = new Vector2(0, -1);
            let angle = Mathematics.degrees(Math.acos(Vector2.dotProduct(u, v)
                / (Vector2.magnitude(u) * Vector2.magnitude(v))));
            if (Vector2.crossProduct(u, v) > 0) {
                angle = 360 - angle;
            }
            this.getTransform().setRotation((angle));
            this.lastPassedPointIndex = j;
        }
        this.getTransform().translate(new Vector2(0, (this.speed * elapsed)));
    }
}
//# sourceMappingURL=Car.js.map