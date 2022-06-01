import GamePawn from '../../engine/ObjectModule/GamePawn.js';
import Vector2 from '../../engine/MathModule/Vector2.js';
export default class Car extends GamePawn {
    speed;
    speedRange;
    targetSpeed;
    acceleration;
    rotationSpeed;
    rotationDirection;
    lastFrameRotationDifference;
    constructor(id, transform, mesh, collider) {
        super(id, transform, mesh, collider);
        this.getCollider().generateRectCollider(this.getMesh().getDimensions().getX(), this.getMesh().getDimensions().getY());
        this.speedRange = new Vector2(-50, 150);
        this.speed = 150;
        this.targetSpeed = 150;
        this.acceleration = 20;
        this.rotationSpeed = 100;
        this.rotationDirection = 'LEFT';
    }
    update(elapsed) {
        let steering = 0;
        if (this.rotationDirection === 'LEFT') {
            steering = -1;
        }
        else if (this.rotationDirection === 'RIGHT') {
            steering = 1;
        }
        this.getTransform().translate(new Vector2(0, this.speed * elapsed));
        this.lastFrameRotationDifference = steering * this.rotationSpeed * elapsed;
        this.getTransform().rotate(this.lastFrameRotationDifference);
    }
}
//# sourceMappingURL=Car.js.map