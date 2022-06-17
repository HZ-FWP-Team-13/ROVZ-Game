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
        const { width } = ctx.measureText(this.text);
        ctx.fillText(this.text, this.getTransform().getPosition().getX() - width / 2, this.getTransform().getPosition().getY() + 5);
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