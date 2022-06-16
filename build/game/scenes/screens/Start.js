import Screen from '../../../engine/SceneModule/Screen.js';
import Menu from '../../../engine/UIModule/Menu.js';
import Transform from '../../../engine/ComponentsModule/Transform.js';
import Level1 from '../levels/Level1.js';
import Button from '../../../engine/UIModule/Button.js';
import Mesh from '../../../engine/ComponentsModule/Mesh.js';
import Vector2 from '../../../engine/MathModule/Vector2.js';
import GameItem from '../../../engine/ObjectModule/GameItem.js';
export default class Start extends Screen {
    titleImage;
    menu;
    constructor(game) {
        super(game);
        this.titleImage = new GameItem('titleImage', new Transform(new Vector2(game.canvas.width / 2, game.canvas.height / 2 - 100)), new Mesh('./assets/img/titleBike.png', new Vector2(574, 376)));
        this.menu = new Menu('startMenu', new Transform(), new Map([
            [
                'play',
                new Button('play', new Transform(new Vector2(game.canvas.width / 2, game.canvas.height / 2 + 200)), new Mesh('./assets/img/longButton.png', new Vector2(200, 50)), 'Play'),
            ],
        ]));
        game.reset();
    }
    update() {
        const hoveredOption = this.menu.update(this.input);
        if (this.input.getMouse().getMouseButtons() === 1) {
            this.input.getMouse().setMouseButtons(0);
            if (hoveredOption === 'play') {
                return new Level1(this.game);
            }
        }
        return null;
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.game.ctx.fillStyle = 'black';
        this.game.ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.titleImage.getMesh().draw(this.game.ctx, this.titleImage.getTransform());
        this.menu.draw(this.game.ctx);
    }
}
//# sourceMappingURL=Start.js.map