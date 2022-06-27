import GamePawn from '../../engine/ObjectModule/GamePawn.js';
import Vector2 from '../../engine/MathModule/Vector2.js';
export default class Player extends GamePawn {
    movementSpeed;
    rotationSpeed;
    lastFrameRotationDifference;
    hitbox;
    constructor(id, transform, mesh, collider) {
        super(id, transform, mesh, collider);
        this.createColliderPoints();
        this.movementSpeed = 1750;
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
    setSpeed(speed) {
        this.movementSpeed = speed;
    }
    getHitbox() {
        return this.hitbox;
    }
    setHitbox(player) {
        this.hitbox = player;
        this.hitbox.createColliderPoints();
    }
}
//# sourceMappingURL=Player.js.map