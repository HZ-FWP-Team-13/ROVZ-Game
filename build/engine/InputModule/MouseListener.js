import Vector2 from '../MathModule/Vector2.js';
export default class MouseListener {
    mousePosition = Vector2.zero;
    mouseButtons;
    mouseInAction = false;
    constructor() {
        window.addEventListener('mousemove', (event) => {
            this.mousePosition = new Vector2(event.clientX, event.clientY);
            if (this.mousePosition.getX() !== 0 || this.mousePosition.getY() !== 0) {
                this.mouseInAction = true;
            }
            this.mouseButtons = event.buttons;
        });
    }
    getMousePosition() {
        return this.mousePosition;
    }
    getMouseButtons() {
        return this.mouseButtons;
    }
    getMouseInAction() {
        return this.mouseInAction;
    }
}
//# sourceMappingURL=MouseListener.js.map