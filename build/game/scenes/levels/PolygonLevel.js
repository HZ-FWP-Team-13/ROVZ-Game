import Level from '../../../engine/Level.js';
import Input from '../../../engine/Input.js';
import Polygon from '../../../engine/experimenting/Polygon.js';
export default class Level1 extends Level {
    poly1;
    poly2;
    constructor(game) {
        super(game);
        this.poly1 = new Polygon(150 - 100, 100 - 100, 0);
        this.poly1.addNewPoint(-10, -10);
        this.poly1.addNewPoint(10, -10);
        this.poly1.addNewPoint(10, 10);
        this.poly1.addNewPoint(-10, 10);
        this.poly2 = new Polygon(300, 500, 0);
        this.poly2.addNewPoint(-100, -100);
        this.poly2.addNewPoint(100, -100);
        this.poly2.addNewPoint(100, 100);
        this.poly2.addNewPoint(-100, 100);
        this.input = new Input();
    }
    update() {
        this.poly1.control();
        return null;
    }
    render() {
        let ctx = this.game.ctx;
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.poly1.draw(ctx);
        this.poly2.draw(ctx);
    }
}
//# sourceMappingURL=PolygonLevel.js.map