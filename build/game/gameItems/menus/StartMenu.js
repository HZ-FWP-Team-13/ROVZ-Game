import Menu from '../../../engine/ObjectModule/Menu.js';
import Input from '../../../engine/InputModule/Input.js';
import MouseListener from '../../../engine/InputModule/MouseListener.js';
export default class StartMenu extends Menu {
    input;
    mouseListener;
    constructor(id, transform, mesh) {
        super(id, transform, mesh);
        this.input = new Input();
        this.mouseListener = new MouseListener();
    }
    logClicks() {
        if (this.input.getMouse().getMouseButtons() === 1) {
            this.mouseListener.getMouseInAction();
            console.log('yay you clicked');
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=StartMenu.js.map