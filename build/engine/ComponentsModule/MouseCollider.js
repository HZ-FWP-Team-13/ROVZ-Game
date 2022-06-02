import Collider from './Collider.js';
export default class MouseCollider extends Collider {
    mouseCollides(gameItem, mouse) {
        return gameItem.getTransform().getPosition().getX() < mouse.getMousePosition().getX()
            && gameItem.getTransform().getPosition().getX()
                + gameItem.getMesh().getSourceImage().width > mouse.getMousePosition().getX()
            && gameItem.getTransform().getPosition().getY() < mouse.getMousePosition().getY()
            && gameItem.getTransform().getPosition().getY()
                + gameItem.getMesh().getSourceImage().height > mouse.getMousePosition().getY();
    }
}
//# sourceMappingURL=MouseCollider.js.map