import GameItem from '../../engine/GameObjectModule/GameItem.js';
export default class Player extends GameItem {
    movementSpeed;
    rotationSpeed;
    lastFrameRotationDifference;
    constructor(transform, mesh) {
        super(transform, mesh);
        this.movementSpeed = 1;
        this.rotationSpeed = 1;
    }
    control(input) {
        const traction = input.readAxisPressed('verticalMovement');
        const steering = input.readAxisPressed('horizontalMovement');
        if (traction != 0) {
            this.transform.translate(0, traction * this.movementSpeed);
        }
        this.transform.rotate(this.lastFrameRotationDifference = steering * this.rotationSpeed * traction);
    }
}
//# sourceMappingURL=Player.js.map