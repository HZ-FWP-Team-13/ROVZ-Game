export default class Vector2 {

  private _x : number;
  private _y : number;

  public static readonly zero = new Vector2(0, 0);
  public static readonly one = new Vector2(1, 1);

  /**
   * Create a new Vector2 instance
   *
   * @param x Projection on Axis X
   * @param y Projection on Axis Y
   */
  public constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * Calculate the sum of 2 given Vector2 (ADDITION)
   * @param a Vector a
   * @param b Vector b
   * @returns The sum of vector a and vector b
   */
  public static vectorsSum(a : Vector2 , b : Vector2) : Vector2 {
    return new Vector2(a.x + b.x, a.y + b.y);
  }

  /**
   * Calculate the difference between 2 given Vector2 (SUBTRACTION)
   * @param a Vector a
   * @param b Vector b
   * @returns The difference of vector a and vector b
   */
  public static vectorDifference (a : Vector2 , b : Vector2) : Vector2  {
    return new Vector2(a.x - b.x, a.y - b.y);
  }

  /**
   * Calculate the product of 2 given Vector2 (MULTIPLICATION)
   * @param a Vector a
   * @param b Vector b
   * @returns The product of vector a and vector b
   */
  public static vectorProduct (a : Vector2 , b : Vector2) : Vector2  {
    return new Vector2(a.x * b.x, a.y * b.y);
  }

  /**
   * Calculate the quotient of 2 given Vector2 (DIVISION)
   * @param a Vector a
   * @param b Vector b
   * @returns The quotient of vector a and vector b
   */
  public static vectorQuotient (a : Vector2 , b : Vector2) : Vector2  {
    return new Vector2(a.x - b.x, a.y - b.y);
  }

  /**
   * Calculate the negative of a given Vector2 (NEGATIVE)
   *
   * @param a Vector a
   * @returns The negative of a given Vector2
   */
  public static vectorNegate (a: Vector2) : Vector2 {
    return new Vector2(-a.x, -a.y);
  }

  /**
   * Get the X value of this Vector2
   *
   * @returns The X value of this Vector2
   */
  get x(): number {
    return this._x;
  }

  /**
   * Set the X value of this Vector2
   *
   * @param x The X value of this Vector2
   */
  set x(x: number) {
    this._x = x;
  }

  /**
   * Get the Y value of this Vector2
   *
   * @returns The Y value of this Vector2
   */
  get y(): number {
    return this._y;
  }

  /**
   * Set the Y value of this Vector2
   *
   * @param y The Y value of this Vector2
   */
  set y(y: number) {
    this._y = y;
  }
}
