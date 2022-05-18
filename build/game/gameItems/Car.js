import GameItem from '../../engine/GameItem.js';
export default class Car extends GameItem {
    constructor(xPos, yPos, rotation) {
        super('./assets/img/PLACEHOLDER_car.png', xPos, yPos, rotation, 128, 128, 128, 128, 0);
    }
    control() {
        throw new Error('Method not implemented.');
    }
}
//# sourceMappingURL=Car.js.map