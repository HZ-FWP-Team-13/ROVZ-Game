import GameItem from '../../engine/GameItem.js';


export default class Car extends GameItem {

  public constructor(
    xPos: number, yPos: number,
    rotation: number,
  ) {
    super(
      './assets/img/PLACEHOLDER_car.png',
      xPos, yPos,
      rotation,
      128,
      128, 128,
      128, 0
    );
  }


  public control(): void {
    throw new Error('Method not implemented.');
  }


}
