import Mesh from '../../engine/ComponentsModule/Mesh.js';
import RectCollider from '../../engine/ComponentsModule/RectCollider.js';
import Transform from '../../engine/ComponentsModule/Transform.js';
import Vector2 from '../../engine/MathModule/Vector2.js';
import GamePawn from '../../engine/ObjectModule/GamePawn.js';

export default class Goal extends GamePawn {
  public constructor(id: string, position: Vector2) {
    const transform = new Transform(position);
    const mesh = new Mesh('assets/img/level/goal.png', new Vector2(64, 64), 0);
    const collider = new RectCollider(new Vector2(64, 64));
    super(id, transform, mesh, collider);
  }
}
