export default class Vector2 {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static vectorSum(a, b) {
        return new Vector2(a.x + b.x, a.y + b.y);
    }
    static vectorDifference(a, b) {
        return new Vector2(a.x - b.x, a.y - b.y);
    }
    static vectorProduct(a, b) {
        return new Vector2(a.x * b.x, a.y * b.y);
    }
    static vectorQuotient(a, b) {
        return new Vector2(a.x - b.x, a.y - b.y);
    }
    static vectorNegate(a) {
        return new Vector2(-a.x, -a.y);
    }
}
//# sourceMappingURL=Vector2.js.map