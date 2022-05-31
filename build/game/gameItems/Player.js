import GamePawn from '../../engine/ObjectModule/GamePawn.js';
import Vector2 from '../../engine/MathModule/Vector2.js';
export default class Player extends GamePawn {
    movementSpeed;
    rotationSpeed;
    lastFrameRotationDifference;
    constructor(id, transform, mesh, collider) {
        super(id, transform, mesh, collider);
        this.collider.generateRectCollider(this.mesh.dimensions.x, this.mesh.dimensions.y);
        this.movementSpeed = 150;
        this.rotationSpeed = 100;
    }
    control(input, elapsed) {
        const traction = input.readAxisPressed('verticalMovement');
        const steering = input.readAxisPressed('horizontalMovement');
        if (traction != 0) {
            this.transform.translate(new Vector2(0, traction * this.movementSpeed * elapsed));
        }
        this.lastFrameRotationDifference = steering * this.rotationSpeed * elapsed * traction;
        this.transform.rotate(this.lastFrameRotationDifference);
    }
}
//# sourceMappingURL=Player.js.map