export default abstract class Graphics {
  /**
   * Load a Source Image from the given path
   *
   * @param imgSourcePath The path to the Source Image
   * @returns The Source Image
   */
  public static loadNewImage(imgSourcePath: string): HTMLImageElement {
    const img = new Image();
    img.src = imgSourcePath;
    return img;
  }
}
