import Collider from '../engine/ComponentsModule/Collider.js';
import Mesh from '../engine/ComponentsModule/Mesh.js';
import Transform from '../engine/ComponentsModule/Transform.js';
import Building from './gameItems/structures/Building.js';
import Vector2 from '../engine/MathModule/Vector2.js';

export default class Factory {
  // The most default of classes.

  /**
   * Function that creates all the buildings on the screen simualteniously
   *
   * @param xPos The X Position of the first building
   * @param yPos The Y Position of the first building
   * @param amount The amount of buildings that need to be created
   * @returns Returns an array of buildings for the Level to use
   */
  public static buildingFactory(
    xPos: number,
    yPos: number,
    amount: number,
  ): Building[] {
    // Initialize new XPosition for the Vector
    const buildings: Building[] = [];
    let vX: number = xPos;
    const vY: number = yPos;
    // For the amount, create that many buildings at intervals
    // This happens in descending order due to the draw method.
    for (let i = 0; i < amount; i++) {
      buildings.push(new Building(
        // The id of the GameObject
        'building',
        // The Transform of the GameObject
        new Transform(
          new Vector2(vX, vY),
        ),
        // The Mesh of the GameItem
        new Mesh(
          // The path to the Source Image of the FovOverlay Mesh
          './assets/img/house.png',
          // The dimensions of the GameItem Mesh
          new Vector2(230, 230),
        ),
        new Collider(),
      ));

      vX += 300;
      console.log(buildings);
    }
    return buildings;
  }
}
