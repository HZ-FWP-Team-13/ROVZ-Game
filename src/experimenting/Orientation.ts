export default class Orientation {

  private angle: number;

  public normalizeRotation(): number {
    this.angle %= 360;
    if (this.angle < 0) {
      this.angle += 360;
    }
    return this.angle;
  }
}
