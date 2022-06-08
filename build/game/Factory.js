import Collider from '../engine/ComponentsModule/Collider.js';
import Mesh from '../engine/ComponentsModule/Mesh.js';
import Transform from '../engine/ComponentsModule/Transform.js';
import Building from './gameItems/structures/Building.js';
import Vector2 from '../engine/MathModule/Vector2.js';
export default class Factory {
    static buildingFactory(xPos, yPos, amount) {
        const buildings = [];
        let vX = xPos;
        const vY = yPos;
        for (let i = 0; i < amount; i++) {
            buildings.push(new Building('building', new Transform(new Vector2(vX, vY)), new Mesh('./assets/img/house.png', new Vector2(230, 230)), new Collider()));
            vX += 300;
            console.log(buildings);
        }
        return buildings;
    }
}
//# sourceMappingURL=Factory.js.map