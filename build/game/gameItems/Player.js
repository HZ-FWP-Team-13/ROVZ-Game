import GameItem from '../../engine/CoreModule/GameItem.js';
import Vector2 from '../../engine/MathModule/Vector2.js';
export default class Player extends GameItem {
    _mesh;
    movementSpeed;
    rotationSpeed;
    lastFrameRotationDifference;
    constructor(id, transform, mesh) {
        super(id, transform);
        this.mesh = mesh;
        this.movementSpeed = 1;
        this.rotationSpeed = 1;
    }
    control(input) {
        const traction = input.readAxisPressed('verticalMovement');
        const steering = input.readAxisPressed('horizontalMovement');
        if (traction != 0) {
            this.transform.translate(new Vector2(0, traction * this.movementSpeed));
        }
        this.transform.rotate(this.lastFrameRotationDifference = steering * this.rotationSpeed * traction);
    }
    get mesh() {
        return this._mesh;
    }
    set mesh(mesh) {
        this._mesh = mesh;
    }
}
//# sourceMappingURL=Player.js.map