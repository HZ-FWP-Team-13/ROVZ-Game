export default class Trigonometry {
  /**
   * Convert degress to radians
   *
   * @param angle An angle measured in degrees
   * @returns An angle measured in radians
   */
  public static radians(angle: number): number {
    return (angle / 180) * Math.PI;
  }
}
