import MouseListener from './MouseListener.js';
export default class Input {
    axises;
    mouse;
    constructor(axises = null) {
        if (axises != null) {
            this.editAxises(axises);
        }
        this.mouse = new MouseListener();
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
    getAxises() {
        return this.axises;
    }
    setAxises(value) {
        this.axises = value;
    }
    getMouse() {
        return this.mouse;
    }
}
//# sourceMappingURL=Input.js.map