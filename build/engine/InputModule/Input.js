import MouseListener from './MouseListener.js';
export default class Input {
    _axises;
    _mouse;
    constructor(axises = null) {
        if (axises != null) {
            this.editAxises(axises);
        }
        this._mouse = new MouseListener();
    }
    editAxises(axises) {
        if (this.axises != null) {
            this.axises = new Map([...this.axises, ...axises]);
        }
        else {
            this.axises = axises;
        }
    }
    getAxis(axisName) {
        return this.axises.get(axisName);
    }
    readAxisPressed(axisName) {
        return this.getAxis(axisName).readPressed();
    }
    readAxisTyped(axisName) {
        return this.getAxis(axisName).readTyped();
    }
    get axises() {
        return this._axises;
    }
    set axises(axises) {
        this._axises = axises;
    }
    get mouse() {
        return this._mouse;
    }
}
//# sourceMappingURL=Input.js.map