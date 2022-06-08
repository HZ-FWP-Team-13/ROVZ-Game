import GamePawn from '../../../engine/ObjectModule/GamePawn.js';
export default class Building1 extends GamePawn {
    constructor(id, transform, mesh, collider) {
        super(id, transform, mesh, collider);
        this.createColliderPoints();
    }
}
//# sourceMappingURL=Building1.js.map