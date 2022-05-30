export default class Mathematics {
  /**
   * Convert degress to radians
   *
   * @param angle An angle measured in degrees
   * @returns An angle measured in radians
   */
  public static radians(angle: number): number {
    return (angle / 180) * Math.PI;
  }

  /**
   * Convert radians to degress
   *
   * @param angle An angle measured in radians
   * @returns An angle measured in degress
   */
  public static degrees(angle: number): number {
    return (angle * 180) / Math.PI;
  }
}
