export default class Vector2 {
    x;
    y;
    static zero = new Vector2(0, 0);
    static one = new Vector2(1, 1);
    static up = new Vector2(0, -1);
    static down = new Vector2(0, 1);
    static left = new Vector2(-1, 0);
    static right = new Vector2(1, 0);
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    static vectorsSum(a, b) {
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
    negate() {
        this.x *= -1;
        this.y *= -1;
        return new Vector2(this.x, this.y);
    }
    static negate(a) {
        return new Vector2(-a.x, -a.y);
    }
    static dotProduct(a, b) {
        return a.x * b.x + a.y * b.y;
    }
    static crossProduct(a, b) {
        return a.x * b.y + a.y * b.x;
    }
    static magnitude(vector) {
        return Math.sqrt((vector.getX() ** 2) + (vector.getY() ** 2));
    }
    getX() {
        return this.x;
    }
    setX(value) {
        this.x = value;
    }
    getY() {
        return this.y;
    }
    setY(value) {
        this.y = value;
    }
}
//# sourceMappingURL=Vector2.js.map