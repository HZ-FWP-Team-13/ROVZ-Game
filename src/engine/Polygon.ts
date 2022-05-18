import XY from "./XY";

export default class Polygon {
  public vertices: XY[];
  public edges: XY[];

  public constructor(vertices: XY[], edges: XY[]) {
    this.vertices = vertices;
    this.edges = edges;
  }
}
