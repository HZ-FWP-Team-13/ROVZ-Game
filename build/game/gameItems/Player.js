import GamePawn from '../../engine/ObjectModule/GamePawn.js';
import Vector2 from '../../engine/MathModule/Vector2.js';
export default class Player extends GamePawn {
    movementSpeed;
    rotationSpeed;
    lastFrameRotationDifference;
    constructor(id, transform, mesh, collider) {
        super(id, transform, mesh, collider);
        this.movementSpeed = 150;
        this.rotationSpeed = 100;
    }
    update(elapsed) {
        this.getCollider().updatePoints(this.getTransform());
    }
    control(input, elapsed) {
        this.getMesh().setAnimationState(0);
        const traction = input.readAxisPressed('verticalMovement');
        const steering = input.readAxisPressed('horizontalMovement');
        if (traction !== 0) {
            this.getMesh().setAnimationState(1);
            this.getTransform().translate(new Vector2(0, traction * this.movementSpeed * elapsed));
        }
        this.lastFrameRotationDifference = steering * this.rotationSpeed * elapsed * traction;
        this.getTransform().rotate(this.lastFrameRotationDifference);
    }
}
//# sourceMappingURL=Player.js.map