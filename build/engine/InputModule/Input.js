export default class Input {
    axises;
    constructor(axises = null) {
        if (axises != null) {
            this.editAxises(axises);
        }
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
}
//# sourceMappingURL=Input.js.map