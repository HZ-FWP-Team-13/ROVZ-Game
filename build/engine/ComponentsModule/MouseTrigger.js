import Component from '../CoreModule/Component.js';
import Vector2 from '../MathModule/Vector2.js';
import Mathematics from '../MathModule/Mathematics.js';
export default class MouseTrigger extends Component {
    state;
    constructor() {
        super('mouseTrigger');
    }
    checkMouseHover(input, gameItem, camera) {
        let mousePosition = input.getMouse().getMousePosition();
        if (camera !== undefined) {
            const cameraRotation = Mathematics.radians(camera.getTransform().getRotation());
            const oldX = mousePosition.getX();
            const oldY = mousePosition.getY();
            const newX = oldX * Math.cos(cameraRotation) - oldY * Math.sin(cameraRotation);
            const newY = oldX * Math.sin(cameraRotation) + oldY * Math.cos(cameraRotation);
            mousePosition = new Vector2(newX, newY);
            mousePosition = Vector2.vectorsSum(mousePosition, camera.getTopLeftCornerPosition());
        }
        const position = gameItem.getTransform().getPosition();
        let rotation = gameItem.getTransform().getRotation();
        const dimesions = gameItem.getMesh().getDimensions();
        rotation = Mathematics.radians(rotation);
        const diagonal = new Vector2(dimesions.getX() * Math.cos(rotation) - dimesions.getY() * Math.sin(rotation), dimesions.getX() * Math.sin(rotation) + dimesions.getY() * Math.cos(rotation));
        const diagonalHalfed = new Vector2(diagonal.getX() / 2, diagonal.getY() / 2);
        const p1FromCenter = Vector2.vectorProduct(diagonalHalfed, new Vector2(1, -1));
        const p2FromCenter = Vector2.vectorProduct(diagonalHalfed, new Vector2(-1, -1));
        const p3FromCenter = Vector2.vectorProduct(diagonalHalfed, new Vector2(-1, 1));
        const p4FromCenter = Vector2.vectorProduct(diagonalHalfed, new Vector2(1, 1));
        const p1 = Vector2.vectorsSum(position, p1FromCenter);
        const p2 = Vector2.vectorsSum(position, p2FromCenter);
        const p3 = Vector2.vectorsSum(position, p3FromCenter);
        const p4 = Vector2.vectorsSum(position, p4FromCenter);
        let d12 = (p2.getX() - p1.getX()) * (mousePosition.getY() - p1.getY());
        d12 -= (mousePosition.getX() - p1.getX()) * (p2.getY() - p1.getY());
        let d23 = (p3.getX() - p2.getX()) * (mousePosition.getY() - p2.getY());
        d23 -= (mousePosition.getX() - p2.getX()) * (p3.getY() - p2.getY());
        let d34 = (p4.getX() - p3.getX()) * (mousePosition.getY() - p3.getY());
        d34 -= (mousePosition.getX() - p3.getX()) * (p4.getY() - p3.getY());
        let d41 = (p1.getX() - p4.getX()) * (mousePosition.getY() - p4.getY());
        d41 -= (mousePosition.getX() - p4.getX()) * (p1.getY() - p4.getY());
        if (d12 >= 0 && d23 >= 0 && d34 >= 0 && d41 >= 0) {
            this.state = true;
        }
        else {
            this.state = false;
        }
        return this.state;
    }
}
//# sourceMappingURL=MouseTrigger.js.map