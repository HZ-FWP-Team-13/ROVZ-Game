export default abstract class Graphics {
  /**
   * Load a source image from the given path
   *
   * @param imgSourcePath The path to the source image
   * @returns The source image
   */
  public static loadNewImage(imgSourcePath: string): HTMLImageElement {
    const img = new Image();
    img.src = imgSourcePath;
    return img;
  }
}
