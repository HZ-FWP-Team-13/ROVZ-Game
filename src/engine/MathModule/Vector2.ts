export default class Vector2 {
  private x : number;

  private y : number;

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
   *
   * @param a Vector a
   * @param b Vector b
   * @returns The sum of vector a and vector b
   */
  public static vectorsSum(a : Vector2, b : Vector2) : Vector2 {
    return new Vector2(a.x + b.x, a.y + b.y);
  }

  /**
   * Calculate the difference between 2 given Vector2 (SUBTRACTION)
   *
   * @param a Vector a
   * @param b Vector b
   * @returns The difference of vector a and vector b
   */
  public static vectorDifference(a : Vector2, b : Vector2) : Vector2 {
    return new Vector2(a.x - b.x, a.y - b.y);
  }

  /**
   * Calculate the product of 2 given Vector2 (MULTIPLICATION)
   *
   * @param a Vector a
   * @param b Vector b
   * @returns The product of vector a and vector b
   */
  public static vectorProduct(a : Vector2, b : Vector2) : Vector2 {
    return new Vector2(a.x * b.x, a.y * b.y);
  }

  /**
   * Calculate the quotient of 2 given Vector2 (DIVISION)
   *
   * @param a Vector a
   * @param b Vector b
   * @returns The quotient of vector a and vector b
   */
  public static vectorQuotient(a : Vector2, b : Vector2) : Vector2 {
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

  /**
   * Calculate the dot product of 2 given Vector2
   *
   * @param a Vector a
   * @param b Vector b
   * @returns The dot product of 2 given Vector2
   */
  public static dotProduct(a: Vector2, b: Vector2): number {
    return a.x * b.x + a.y * b.y;
  }

  /**
   * Calculate the cross product of 2 given Vector2
   *
   * @param a One Vector2
   * @param b The other Vector2
   * @returns The cross product of the 2 Vector2
   */
  public static crossProduct(a: Vector2, b: Vector2): number {
    return a.x * b.y + a.y * b.x;
  }

  /**
   * Obtain the magnitude of a given vector
   *
   * @param vector The vector you want to obtain the magnitude of
   * @returns The magnitude of a vector
   */
  public static magnitude(vector: Vector2) : number {
    return Math.sqrt((vector.getX() ** 2) + (vector.getY() ** 2));
  }

  /**
   * Get the X value of this Vector2
   *
   * @returns The X value of this Vector2
   */
  public getX(): number {
    return this.x;
  }

  /**
   * Set the X value of this Vector2
   *
   * @param value The X value of this Vector2
   */
  public setX(value: number): void {
    this.x = value;
  }

  /**
   * Get the Y value of this Vector2
   *
   * @returns The Y value of this Vector2
   */
  public getY(): number {
    return this.y;
  }

  /**
   * Set the Y value of this Vector2
   *
   * @param value The Y value of this Vector2
   */
  public setY(value: number): void {
    this.y = value;
  }
}
