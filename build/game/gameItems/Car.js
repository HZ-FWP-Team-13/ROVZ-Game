import Vector2 from '../../engine/MathModule/Vector2.js';
import Mathematics from '../../engine/MathModule/Mathematics.js';
import Vehicle from './Vehicle.js';
export default class Car extends Vehicle {
    constructor(id, path, startPoint, skin) {
        let sip = '';
        switch (skin) {
            case 'RED':
                sip = 'assets/img/cars/car_red.png';
                break;
            case 'BLUE':
                sip = 'assets/img/cars/car_blue.png';
                break;
            case 'GREEN':
                sip = 'assets/img/cars/car_green.png';
                break;
            default:
                sip = 'assets/img/cars/car_red.png';
                break;
        }
        const speed = 500;
        const wh = new Vector2(64, 128);
        super(id, path, startPoint, speed, sip, wh);
    }
    update(elapsed) {
        const points = this.path.getPoints();
        const i = this.lastPassedPointIndex;
        const j = (i + 1) % points.length;
        const a = points[i];
        const b = points[(j) % points.length];
        const ab = Vector2.magnitude(Vector2.vectorDifference(b, a));
        const c = Vector2.magnitude(Vector2.vectorDifference(this.getTransform().getPosition(), a));
        if (c >= ab) {
            const k = (j + 1) % points.length;
            this.getTransform().setPosition(b);
            const u = new Vector2(points[k].getX() - points[j].getX(), points[k].getY() - points[j].getY());
            const v = new Vector2(0, -1);
            let angle = Mathematics.degrees(Math.acos(Vector2.dotProduct(u, v)
                / (Vector2.magnitude(u) * Vector2.magnitude(v))));
            if (Vector2.crossProduct(u, v) > 0) {
                angle = 360 - angle;
            }
            this.getTransform().setRotation((angle));
            this.lastPassedPointIndex = j;
        }
        this.getTransform().translate(new Vector2(0, (this.speed * elapsed)));
        if (this.lastPassedPointIndex === this.path.getLastPointIndex()) {
            this.getTransform().setPosition(points[0]);
        }
        console.log(this.lastPassedPointIndex);
    }
}
//# sourceMappingURL=Car.js.map