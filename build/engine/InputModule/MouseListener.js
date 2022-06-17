import Vector2 from '../MathModule/Vector2.js';
export default class MouseListener {
    mousePosition = Vector2.zero;
    mouseButtons = 0;
    mouseInAction = false;
    constructor() {
        window.addEventListener('mousemove', (event) => {
            this.mousePosition = new Vector2(event.clientX, event.clientY);
            if (this.mousePosition.getX() !== 0 || this.mousePosition.getY() !== 0) {
                this.mouseInAction = true;
            }
        });
        window.addEventListener('click', () => {
            this.mouseButtons = 1;
        });
    }
    getMousePosition() {
        return this.mousePosition;
    }
    getMouseButtons() {
        return this.mouseButtons;
    }
    setMouseButtons(mouseButtons) {
        this.mouseButtons = mouseButtons;
    }
    getMouseInAction() {
        return this.mouseInAction;
    }
}
//# sourceMappingURL=MouseListener.js.map