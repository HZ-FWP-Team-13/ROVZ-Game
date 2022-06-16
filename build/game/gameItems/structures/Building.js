import GamePawn from '../../../engine/ObjectModule/GamePawn.js';
export default class Building extends GamePawn {
    constructor(id, transform, mesh, collider) {
        super(id, transform, mesh, collider);
        this.createColliderPoints();
    }
}
//# sourceMappingURL=Building.js.map