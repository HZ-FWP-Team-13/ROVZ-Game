import GameItem from './GameItem.js';

export default class Vehicle extends GameItem {
  /**
   *
   * @param maxX Maximum x
   * @param maxY Maximum y
   */
  public constructor(maxX: number, maxY: number) {
    super(50, 50, './assets/img/car.png', maxX, maxY, null, 50);
  }
}
