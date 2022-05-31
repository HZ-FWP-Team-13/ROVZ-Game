export default abstract class GameObject {
  // The id of the GameObject
  private _id: string;

  /**
   * Create a new GameObject instance
   *
   * @param id The id of the GameObject
   */
  public constructor(id: string) {
    this.id = id;
  }

  /**
   * Get the id of the GameObject
   *
   * @returns The id of the GameObject
   */
  public get id(): string {
    return this._id;
  }
  /**
   * Set the id of the GameObject
   *
   * @param value The id of the GameObject
   */
  public set id(value: string) {
    this._id = value;
  }
}
