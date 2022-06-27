import GameItem from '../ObjectModule/GameItem.js';
import MouseTrigger from '../ComponentsModule/MouseTrigger.js';
export default class Button extends GameItem {
    text;
    mouseTrigger;
    constructor(id, transform, mesh, text) {
        super(id, transform, mesh);
        this.text = text;
        this.mouseTrigger = new MouseTrigger();
    }
    draw(ctx) {
        this.getMesh().draw(ctx, this.getTransform());
        ctx.fillText(this.text, this.getTransform().getPosition().getX(), this.getTransform().getPosition().getY() + 5);
    }
    getText() {
        return this.text;
    }
    setText(value) {
        this.text = value;
    }
    getMouseTrigger() {
        return this.mouseTrigger;
    }
}
//# sourceMappingURL=Button.js.map