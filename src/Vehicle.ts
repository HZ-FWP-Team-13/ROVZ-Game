import GameItem from './GameItem';

export default class Vehicle extends GameItem {
  /**
   *
   * @param maxX Maximum x
   * @param maxY Maximum y
   */
  public constructor(maxX: number, maxY: number) {
    super(512, 512, './assets/img/car.png', 50, 50, 1, 512);
  }
}
