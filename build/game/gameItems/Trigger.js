import Collider from '../../engine/ComponentsModule/Collider.js';
import Mesh from '../../engine/ComponentsModule/Mesh.js';
import Vector2 from '../../engine/MathModule/Vector2.js';
import GamePawn from '../../engine/ObjectModule/GamePawn.js';
export default class CarTrigger extends GamePawn {
    constructor(id, transform, width, height) {
        super(id, transform, new Mesh('', new Vector2(width, height), 0), new Collider());
        this.getCollider().generateRectCollider(this.getMesh().getDimensions().getX(), this.getMesh().getDimensions().getY());
    }
    draw(ctx) {
        ctx.fillStyle = 'orange';
        ctx.beginPath();
        for (let i = 0; i < this.getCollider().getUpdatedPoints().length; i++) {
            ctx.lineTo(this.getCollider().getUpdatedPoints()[i].getX(), this.getCollider().getUpdatedPoints()[i].getY());
        }
        ctx.closePath();
        ctx.fill();
    }
}
//# sourceMappingURL=Trigger.js.map