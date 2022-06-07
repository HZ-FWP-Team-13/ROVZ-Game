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
        this.speed = 300;
        this.targetSpeed = 150;
        this.acceleration = 20;
    }
    update(elapsed) {
        this.getCollider().updatePoints(this.getTransform());
        const points = this.path.getPoints();
        for (let i = 0; i < points.length; i++) {
            const tx = this.getTransform().getPosition().getX();
            const ty = this.getTransform().getPosition().getY();
            const px = points[i].getX();
            const py = points[i].getY();
            if ((tx >= px - 5 && tx <= px + 5) && (ty <= py + 5 && ty >= py - 5)) {
                const b = (i + 1) % points.length;
                const u = new Vector2(points[b].getX() - points[i].getX(), points[b].getY() - points[i].getY());
                const v = new Vector2(0, -1);
                let angle = Mathematics.degrees(Math.acos(Vector2.dotProduct(u, v)
                    / (Vector2.magnitude(u) * Vector2.magnitude(v))));
                if (Vector2.crossProduct(u, v) > 0) {
                    angle = 360 - angle;
                }
                this.getTransform().setRotation((angle));
            }
        }
        this.getTransform().translate(new Vector2(0, (this.speed * elapsed)));
    }
}
//# sourceMappingURL=Car.js.map