import InputAxis from './InputAxis.js';
import KeyListener from './KeyListener.js';
export default class Input {
    axises;
    constructor(axises = null) {
        this.axises = new Map([...axises, ...new Map([
                ['horizontal', new InputAxis(KeyListener.KEY_D, KeyListener.KEY_A)],
                ['vertical', new InputAxis(KeyListener.KEY_W, KeyListener.KEY_S)]
            ])]);
    }
    readAxisInput(axisName) {
        return this.axises.get(axisName).readInput();
    }
    getAxis(axisName) {
        return this.axises.get(axisName);
    }
}
//# sourceMappingURL=Input.js.map