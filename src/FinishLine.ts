import GameItem from './GameItem';

export default class FinishLine extends GameItem {
  /**
   *
   * @param maxX Maximum x
   * @param maxY Maximum y
   */
  public constructor(maxX: number, maxY: number) {
    super(318, 159, './assets/img/finishline.png', maxX, maxY, 1, 318);
  }
}
