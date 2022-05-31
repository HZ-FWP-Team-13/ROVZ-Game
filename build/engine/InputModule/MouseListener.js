import Vector2 from "../MathModule/Vector2.js";
export default class MouseListener {
    _mousePosition = Vector2.zero;
    _mouseButtons;
    _mouseInAction = false;
    constructor() {
        window.addEventListener('mousemove', (event) => {
            this._mousePosition = new Vector2(event.clientX, event.clientY);
            if (this._mousePosition.x != 0 || this._mousePosition.y != 0) {
                this._mouseInAction = true;
            }
            this._mouseButtons = event.buttons;
        });
    }
    get mousePosition() {
        return this._mousePosition;
    }
    get mouseButtons() {
        return this._mouseButtons;
    }
    get mouseInAction() {
        return this._mouseInAction;
    }
}
//# sourceMappingURL=MouseListener.js.map