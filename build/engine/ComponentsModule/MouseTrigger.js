import Component from '../CoreModule/Component.js';
import Vector2 from '../MathModule/Vector2.js';
export default class MouseTrigger extends Component {
    state;
    constructor() {
        super('mouseTrigger');
    }
    checkMouseHover(input, gameItem, camera) {
        const mousePosition = input.getMouse().getMousePosition();
        const position = gameItem.getTransform().getPosition();
        const halfedDimensions = new Vector2(gameItem.getMesh().getDimensions().getX() / 2, gameItem.getMesh().getDimensions().getY() / 2);
        const a = Vector2.vectorDifference(position, halfedDimensions);
        const b = Vector2.vectorsSum(position, halfedDimensions);
        const aTest = Vector2.vectorDifference(mousePosition, a);
        const bTest = Vector2.vectorDifference(b, mousePosition);
        if (aTest.getX() >= 0 && aTest.getY() >= 0 && bTest.getX() >= 0 && bTest.getY() >= 0) {
            this.state = true;
        }
        else {
            this.state = false;
        }
        return this.state;
    }
}
//# sourceMappingURL=MouseTrigger.js.map