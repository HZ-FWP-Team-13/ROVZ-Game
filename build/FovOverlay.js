import GameItem from './GameItem.js';
export default class FovOverlay extends GameItem {
    constructor(xPos, yPos) {
        super(6000, 6000, './assets/img/fov.png', 0, 0, 0, 6000);
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.xPos - this.img.width / 2, this.yPos - this.img.height / 2);
    }
    move(canvas) { }
}
//# sourceMappingURL=FovOverlay.js.map