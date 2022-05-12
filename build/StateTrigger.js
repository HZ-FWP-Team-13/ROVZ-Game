export default class StateTrigger {
    x;
    y;
    width;
    height;
    state;
    constructor(x, y, width, height, state) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.state = state;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }
    getState() {
        return this.state;
    }
    getTopBound() {
        return this.y;
    }
    getBottomBound() {
        return this.y + this.height;
    }
    getLeftBound() {
        return this.x;
    }
    getRightBound() {
        return this.x + this.width;
    }
}
//# sourceMappingURL=StateTrigger.js.map