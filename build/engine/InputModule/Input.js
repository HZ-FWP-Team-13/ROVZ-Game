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
    axis(axisName) {
        return this.axises.get(axisName);
    }
    readAxisPressed(axisName) {
        return this.axis(axisName).readPressed();
    }
    readAxisTyped(axisName) {
        return this.axis(axisName).readTyped();
    }
    get axises() {
        return this._axises;
    }
    set axises(value) {
        this._axises = value;
    }
    get mouse() {
        return this._mouse;
    }
}
//# sourceMappingURL=Input.js.map