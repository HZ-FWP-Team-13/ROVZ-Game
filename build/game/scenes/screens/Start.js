import Screen from '../../../engine/SceneModule/Screen.js';
import Level1 from '../levels/Level1.js';
import StartMenu from '../../gameItems/menus/StartMenu.js';
import Transform from '../../../engine/ComponentsModule/Transform.js';
import Mesh from '../../../engine/ComponentsModule/Mesh.js';
import Vector2 from '../../../engine/MathModule/Vector2.js';
export default class Start extends Screen {
    startMenu;
    constructor(game) {
        super(game);
        game.reset();
        this.startMenu = new StartMenu('startmenu', new Transform(), new Mesh('./assets/img/startscreen.png', new Vector2(this.game.canvas.width, this.game.canvas.height)));
    }
    update() {
        if (this.input.readAxisTyped('Select')) {
            return new Level1(this.game);
        }
        return null;
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.startMenu.getMesh().drawMenu(this.game.ctx, this.startMenu.getTransform());
    }
}
//# sourceMappingURL=Start.js.map