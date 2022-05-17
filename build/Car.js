import GameItem from "./GameItem.js";
export default class Car extends GameItem {
    state;
    constructor(xPos, yPos, state) {
        super('./assets/img/placeholder_car.png', xPos, yPos, 0, 128, 128, 128, 128, 0);
        this.state = state;
    }
    control() {
        return null;
    }
    move() {
        switch (this.state) {
            case 'UP': {
                this.yPos -= 3;
                this.rotation = 0;
                break;
            }
            case 'DOWN': {
                this.yPos += 3;
                this.rotation = 180;
                break;
            }
            case 'RIGHT': {
                this.xPos += 3;
                this.rotation = 90;
                break;
            }
            case 'LEFT': {
                this.xPos -= 3;
                this.rotation = 270;
                break;
            }
            case 'IDLE': {
                break;
            }
            case 'IDLE': {
                break;
            }
        }
    }
    setState(state) {
        this.state = state;
    }
}
//# sourceMappingURL=Car.js.map