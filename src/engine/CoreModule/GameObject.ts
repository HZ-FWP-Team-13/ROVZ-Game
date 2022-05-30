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
  get id(): string {
    return this._id;
  }

  /**
   * Set the id of the GameObject
   *
   * @param id The id of the GameObject
   */
  set id(id: string) {
    this._id = id;
  }
}
