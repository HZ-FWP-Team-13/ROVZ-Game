import Collider from './Collider.js';
export default class RectCollider extends Collider {
    constructor(dimensions) {
        super();
        const width = dimensions.getX();
        const height = dimensions.getY();
        this.addNewPoint(-width / 2, -height / 2);
        this.addNewPoint(width / 2, -height / 2);
        this.addNewPoint(width / 2, height / 2);
        this.addNewPoint(-width / 2, height / 2);
    }
}
//# sourceMappingURL=RectCollider.js.map