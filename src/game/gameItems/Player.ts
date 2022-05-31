import GameItem from '../../engine/CoreModule/GameItem.js';
import Transform from '../../engine/ComponentsModule/Transform.js';
import Mesh from '../../engine/ComponentsModule/Mesh.js';
import Input from '../../engine/InputModule/Input.js';
import Vector2 from '../../engine/MathModule/Vector2.js';
import Collider from '../../engine/ComponentsModule/Collider.js';

export default class Player extends GameItem {
  // The Mesh of the Player
  private _mesh: Mesh;

  // The collider of the Player
  private _collider: Collider;

  // The speed of the Player movement measured in pixels per second
  public movementSpeed: number;

  // The speed of the Player rotation measured in degrees per second
  public rotationSpeed: number;

  // The rotation the Player underwent since the last Frame
  public lastFrameRotationDifference: number;

  /**
   * Create a new Player instance
   *
   * @param id The id of the GameObject
   * @param transform The Transform of the Player
   * @param mesh The Mesh of the Player
   */
  public constructor(id: string, transform: Transform, mesh: Mesh) {
    super(id, transform);
    this.mesh = mesh;
    this.collider = new Collider();
    this.collider.generateRectCollider(this.mesh.dimensions.x, this.mesh.dimensions.y);

    this.movementSpeed = 150;
    this.rotationSpeed = 100;
  }

  /**
   * Move this Player across the Game Canvas in response to the Player Input
   *
   * @param input of the keys when moving
   * @param elapsed the time in seconds that has been elapsed since the previous frame
   */
  public control(input: Input, elapsed: number): void {
    // Read the Input of the Vertical InputAxis
    const traction = input.readAxisPressed('verticalMovement');
    // Read the Input of the Horizontal InputAxis
    const steering = input.readAxisPressed('horizontalMovement');

    // Traction
    if (traction != 0) {
      // TODO: this.transform.translate(Vector2.up * traction * this.movementSpeed * elapsed);
      this.transform.translate(new Vector2(0, traction * this.movementSpeed * elapsed));
    }

    // Steering
    this.lastFrameRotationDifference = steering * this.rotationSpeed * elapsed * traction;
    this.transform.rotate(this.lastFrameRotationDifference);
  }

  /**
   * Get the Mesh of this Player
   *
   * @returns The Mesh of this Player
   */
  public get mesh(): Mesh {
    return this._mesh;
  }
  /**
   * Set the Mesh of this Player
   *
   * @param value The Mesh of this Player
   */
  public set mesh(value: Mesh) {
    this._mesh = value;
  }

  /**
   * Get the Collider of this Player
   *
   * @returns The Collider of this Player
   */
  public get collider(): Collider {
    return this._collider;
  }
  /**
   * Set the Collider of this Player
   *
   * @param value The Collider of this Player
   */
  public set collider(value: Collider) {
    this._collider = value;
  }
}
