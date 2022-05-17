export default class Orientation {
    angle;
    normalizeRotation() {
        this.angle %= 360;
        if (this.angle < 0) {
            this.angle += 360;
        }
        return this.angle;
    }
}
//# sourceMappingURL=Orientation.js.map