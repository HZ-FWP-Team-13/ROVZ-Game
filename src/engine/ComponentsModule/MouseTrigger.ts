import Component from '../CoreModule/Component.js';
import GameItem from '../ObjectModule/GameItem.js';
import Input from '../InputModule/Input.js';
import Camera from '../GraphicsModule/Camera.js';
import Vector2 from '../MathModule/Vector2.js';
import Mathematics from '../MathModule/Mathematics.js';

export default class MouseTrigger extends Component {
  // The state of the MouseTrigger
  private state: boolean;

  /**
   * Create a new MouseTrigger instance
   */
  public constructor() {
    super('mouseTrigger');
  }

  /**
   * Get `true` if the Mouse hovers over the GameItem
   *
   * @param input The Input matrix of this Scene
   * @param gameItem The GameItem
   * @param camera The Camera of the Level
   * @returns `true` if the Mouse hovers over the GameItem
   */
  public checkMouseHover(input: Input, gameItem: GameItem, camera?: Camera): boolean {
    // The position of the Mouse in coordinates relative to the Screen
    let mousePosition: Vector2 = input.getMouse().getMousePosition();

    // In case a Camera is provided (each Level has one) -
    // the absolute coordinates of the Mouse are calculated based on the Transform of the Camera
    if (camera !== undefined) {
      // Applying Camera rotation to the Mouse position Vector2
      const cameraRotation: number = Mathematics.radians(camera.getTransform().getRotation());
      const oldX: number = mousePosition.getX();
      const oldY: number = mousePosition.getY();
      const newX: number = oldX * Math.cos(cameraRotation) - oldY * Math.sin(cameraRotation);
      const newY: number = oldX * Math.sin(cameraRotation) + oldY * Math.cos(cameraRotation);
      mousePosition = new Vector2(newX, newY);

      // Adding the position of the Top Left Camera Frame corner
      mousePosition = Vector2.vectorsSum(mousePosition, camera.getTopLeftCornerPosition());
    }

    // Accessing the GameItem properties
    const position: Vector2 = gameItem.getTransform().getPosition();
    let rotation: number = gameItem.getTransform().getRotation();
    const dimesions: Vector2 = gameItem.getMesh().getDimensions();

    // Converting the rotation to radians
    rotation = Mathematics.radians(rotation);

    // Calculating diagonal
    const diagonal: Vector2 = new Vector2(
      dimesions.getX() * Math.cos(rotation) - dimesions.getY() * Math.sin(rotation),
      dimesions.getX() * Math.sin(rotation) + dimesions.getY() * Math.cos(rotation),
    );

    // Calculating halfed diagonal
    const diagonalHalfed: Vector2 = new Vector2(diagonal.getX() / 2, diagonal.getY() / 2);

    // Calculating Vectors2 from GameItem center to corner points
    const p1FromCenter: Vector2 = Vector2.vectorProduct(diagonalHalfed, new Vector2(1, -1));
    const p2FromCenter: Vector2 = Vector2.vectorProduct(diagonalHalfed, new Vector2(-1, -1));
    const p3FromCenter: Vector2 = Vector2.vectorProduct(diagonalHalfed, new Vector2(-1, 1));
    const p4FromCenter: Vector2 = Vector2.vectorProduct(diagonalHalfed, new Vector2(1, 1));

    // Calculating the positions of corner points in absolute coordinate system
    const p1: Vector2 = Vector2.vectorsSum(position, p1FromCenter);
    const p2: Vector2 = Vector2.vectorsSum(position, p2FromCenter);
    const p3: Vector2 = Vector2.vectorsSum(position, p3FromCenter);
    const p4: Vector2 = Vector2.vectorsSum(position, p4FromCenter);

    // Calculating line equations for GameItem Mesh sides
    let d12 = (p2.getX() - p1.getX()) * (mousePosition.getY() - p1.getY());
    d12 -= (mousePosition.getX() - p1.getX()) * (p2.getY() - p1.getY());

    let d23 = (p3.getX() - p2.getX()) * (mousePosition.getY() - p2.getY());
    d23 -= (mousePosition.getX() - p2.getX()) * (p3.getY() - p2.getY());

    let d34 = (p4.getX() - p3.getX()) * (mousePosition.getY() - p3.getY());
    d34 -= (mousePosition.getX() - p3.getX()) * (p4.getY() - p3.getY());

    let d41 = (p1.getX() - p4.getX()) * (mousePosition.getY() - p4.getY());
    d41 -= (mousePosition.getX() - p4.getX()) * (p1.getY() - p4.getY());

    // Checking wether the Mouse lies within the GameItem Mesh
    if (d12 >= 0 && d23 >= 0 && d34 >= 0 && d41 >= 0) {
      this.state = true;
    } else {
      this.state = false;
    }
    return this.state;
  }
}
