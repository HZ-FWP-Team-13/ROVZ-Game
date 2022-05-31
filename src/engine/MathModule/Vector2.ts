export default class Vector2 {

  private _x : number;
  private _y : number;

  public static readonly zero = new Vector2(0, 0);
  public static readonly one = new Vector2(1, 1);

  public static readonly up = new Vector2(0, -1);
  public static readonly down = new Vector2(0, 1);
  public static readonly left = new Vector2(-1, 0);
  public static readonly right = new Vector2(1, 0);

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
  public static vectorDifference(a : Vector2 , b : Vector2) : Vector2  {
    return new Vector2(a.x - b.x, a.y - b.y);
  }

  /**
   * Calculate the product of 2 given Vector2 (MULTIPLICATION)
   * @param a Vector a
   * @param b Vector b
   * @returns The product of vector a and vector b
   */
  public static vectorProduct(a : Vector2 , b : Vector2) : Vector2  {
    return new Vector2(a.x * b.x, a.y * b.y);
  }

  /**
   * Calculate the quotient of 2 given Vector2 (DIVISION)
   * @param a Vector a
   * @param b Vector b
   * @returns The quotient of vector a and vector b
   */
  public static vectorQuotient(a : Vector2 , b : Vector2) : Vector2  {
    return new Vector2(a.x - b.x, a.y - b.y);
  }

  /**
   * Calculate the negative of this Vector2 (NEGATIVE)
   *
   * @returns The negative of this Vector2
   */
  public negate() : Vector2 {
    this.x *= -1;
    this.y *= -1;
    return new Vector2(this.x, this.y);
  }

  /**
   * Calculate the negative of a given Vector2 (NEGATIVE)
   *
   * @param a Vector a
   * @returns The negative of a given Vector2
   */
  public static negate(a: Vector2) : Vector2 {
    return new Vector2(-a.x, -a.y);
  }

  public static dotProduct(a: Vector2, b: Vector2) {
    return a.x * b.x + a.y * b.y;
  }

  /**
   * Get the X value of this Vector2
   *
   * @returns The X value of this Vector2
   */
  public get x(): number {
    return this._x;
  }
  /**
   * Set the X value of this Vector2
   *
   * @param value The X value of this Vector2
   */
  public set x(value: number) {
    this._x = value;
  }

  /**
   * Get the Y value of this Vector2
   *
   * @returns The Y value of this Vector2
   */
  public get y(): number {
    return this._y;
  }
  /**
   * Set the Y value of this Vector2
   *
   * @param value The Y value of this Vector2
   */
  public set y(value: number) {
    this._y = value;
  }
}
