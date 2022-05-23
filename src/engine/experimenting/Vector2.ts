export default class Vector2 {

  public x : number;
  public y : number;

  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }



  /**
   * Calculate the sum of 2 given vectors (ADDITION)
   * @param a Vector a
   * @param b Vector b
   * @returns The sum of vector a and vector b
   */
  public static vectorsSum (a : Vector2 , b : Vector2) : Vector2  {
    return new Vector2(a.x + b.x, a.y + b.y);
  }

  /**
  * Calculate the difference between 2 given vectors (SUBTRACTION)
  * @param a Vector a
  * @param b Vector b
  * @returns The difference of vector a and vector b
  */
  public static vectorDifference (a : Vector2 , b : Vector2) : Vector2  {
    return new Vector2(a.x - b.x, a.y - b.y);
  }

  // /**
  // * Calculate the product of 2 given vectors (MULTIPLICATION)
  // * @param a Vector a
  // * @param b Vector b
  // * @returns The product of vector a and vector b
  // */
  // public static vectorProduct (a : Vector2 , b : Vector2) : Vector2  {
  //   return new Vector2(a.x * b.x, a.y * b.y);
  // }

  // /**
  // * Calculate the quotient of 2 given vectors (DIVISION)
  // * @param a Vector a
  // * @param b Vector b
  // * @returns The quotient of vector a and vector b
  // */
  // public static vectorQuotient (a : Vector2 , b : Vector2) : Vector2  {
  //   return new Vector2(a.x - b.x, a.y - b.y);
  // }


  /**
   * Returns the dot product of two vectors
   * @param a
   * @param b
   * @returns
   */
  public static dotProduct (a: Vector2, b: Vector2) : number {
    return (a.x * b.x + a.y * b.y);
  }


  public static vectorNegate (a: Vector2) : Vector2 {
    return new Vector2(-a.x, -a.y);
  }

}
