import Vector2 from "../experimenting/Vector2.js";
export default class MouseListener {
    mousePosition = new Vector2();
    mouseButtons;
    mouseInAction = false;
    constructor() {
        window.addEventListener('mousemove', (event) => {
            this.mousePosition = new Vector2(event.clientX, event.clientY);
            if (this.mousePosition.x != 0 || this.mousePosition.y != 0) {
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