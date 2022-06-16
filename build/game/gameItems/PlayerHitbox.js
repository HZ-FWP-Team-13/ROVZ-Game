import Vector2 from '../../engine/MathModule/Vector2.js';
import GamePawn from '../../engine/ObjectModule/GamePawn.js';
export default class PlayerHitbox extends GamePawn {
    movementSpeed;
    rotationSpeed;
    lastFrameRotationDifference;
    constructor(id, transform, mesh, collider) {
        super(id, transform, mesh, collider);
        this.createColliderPoints();
        this.movementSpeed = 150;
        this.rotationSpeed = 100;
    }
    control(input, elapsed) {
        const traction = input.readAxisPressed('verticalMovement');
        const steering = input.readAxisPressed('horizontalMovement');
        if (traction !== 0) {
            this.getTransform().translate(new Vector2(0, traction * this.movementSpeed * elapsed));
        }
        this.lastFrameRotationDifference = steering * this.rotationSpeed * elapsed * traction;
        this.getTransform().rotate(this.lastFrameRotationDifference);
    }
}
//# sourceMappingURL=PlayerHitbox.js.map