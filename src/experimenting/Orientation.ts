export default class Orientation {

  private angle: number;

  public constructor(angle: number = 0) {
    this.angle = angle;
  }

  public normalizeRotation(): number {
    this.angle %= 360;
    if (this.angle < 0) {
      this.angle += 360;
    }
    return this.angle;
  }
}
