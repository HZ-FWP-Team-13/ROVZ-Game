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
    constructor(id, path, startPoint, mesh, collider) {
        const transform = new Transform(path.getPoints()[startPoint], 0, new Vector2(1, 1));
        super(id, transform, mesh, collider);
        this.path = path;
        this.getCollider().generateRectCollider(this.getMesh().getDimensions().getX(), this.getMesh().getDimensions().getY());
        this.speedRange = new Vector2(-50, 150);
        this.speed = 150;
        this.targetSpeed = 150;
        this.acceleration = 20;
    }
    update(elapsed) {
        let points = this.path.getPoints();
        for (let i = 0; i < points.length; i++) {
            let tx = this.getTransform().getPosition().getX();
            let ty = this.getTransform().getPosition().getY();
            let px = points[i].getX();
            let py = points[i].getY();
            if ((tx >= px - 5 && tx <= px + 5) && (ty <= py + 5 && ty >= py - 5)) {
                const b = (i + 1) % points.length;
                let u = new Vector2(points[b].getX() - points[i].getX(), points[b].getY() - points[i].getY());
                let v = new Vector2(0, -(points[b].getY() - points[i].getY()));
                let angle = Mathematics.degrees(Math.acos(Vector2.dotProduct(u, v) / (Vector2.magnitude(u) * Vector2.magnitude(v))));
                if (Vector2.crossProduct(u, v) > 0)
                    angle = 360 - angle;
                this.getTransform().setRotation((angle));
            }
        }
        this.getTransform().translate(new Vector2(0, 1));
    }
}
//# sourceMappingURL=Car.js.map