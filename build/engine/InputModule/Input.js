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
    getAxises() {
        return this.axises;
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
    getMousePosition() {
        return this.mouse.getMousePosition();
    }
    getMouseButtons() {
        return this.mouse.getMouseButtons();
    }
    getMouseInAction() {
        return this.mouse.getMouseInAction();
    }
}
//# sourceMappingURL=Input.js.map