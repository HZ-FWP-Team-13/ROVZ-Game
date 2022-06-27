import GameObject from '../ObjectModule/GameObject.js';
export default class Menu extends GameObject {
    options;
    constructor(id, transform, options) {
        super(id, transform);
        this.options = options;
    }
    update(input) {
        let hoveredOption = '';
        this.options.forEach((option) => {
            if (option.getMouseTrigger().checkMouseHover(input, option)) {
                hoveredOption = option.getId();
                option.getMesh().setSourceImagePath('./assets/img/longButtonHover.png');
            }
            else {
                option.getMesh().setSourceImagePath('./assets/img/longButton.png');
            }
        });
        return hoveredOption;
    }
    draw(ctx, font) {
        ctx.textAlign = 'center';
        ctx.fillStyle = 'black';
        if (font === undefined) {
            ctx.font = '20px serif';
        }
        else {
            ctx.font = font;
        }
        this.options.forEach((option) => {
            option.draw(ctx);
        });
    }
    getOptions() {
        return this.options;
    }
    setOptions(value) {
        this.options = value;
    }
}
//# sourceMappingURL=Menu.js.map