import GamePawn from './GamePawn.js';
import MouseCollider from '../ComponentsModule/MouseCollider';
export default class MenuButton extends GamePawn {
    mouseCollider;
    constructor(id, transform, mesh, collider) {
        super(id, transform, mesh, collider);
        this.mouseCollider = new MouseCollider();
    }
    getMouseCollider() {
        return this.mouseCollider;
    }
}
//# sourceMappingURL=MenuButton.js.map