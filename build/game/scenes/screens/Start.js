import Screen from '../../../engine/SceneModule/Screen.js';
import Level1 from '../levels/Level1.js';
import StartMenu from '../../gameItems/menus/StartMenu.js';
import Transform from '../../../engine/ComponentsModule/Transform.js';
import Mesh from '../../../engine/ComponentsModule/Mesh.js';
import Vector2 from '../../../engine/MathModule/Vector2.js';
import MenuButton from '../../../engine/ObjectModule/MenuButton.js';
import Collider from '../../../engine/ComponentsModule/Collider.js';
export default class Start extends Screen {
    startMenu;
    menuButton;
    constructor(game) {
        super(game);
        game.reset();
        this.startMenu = new StartMenu('startmenu', new Transform(), new Mesh('./assets/img/startscreen.png', new Vector2(this.game.canvas.width, this.game.canvas.height)));
        this.menuButton = new MenuButton('menubutton', new Transform(), new Mesh('./assets/img/playbutton.png', new Vector2(512, 512)), new Collider());
    }
    update() {
        if (this.input.readAxisTyped('Select')) {
            return new Level1(this.game);
        }
        if (this.startMenu.logClicks()) {
            return new Level1(this.game);
        }
        return null;
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.startMenu.getMesh().drawMenu(this.game.ctx, this.startMenu.getTransform());
        this.menuButton.getMesh().drawMenu(this.game.ctx, this.menuButton.getTransform());
    }
}
//# sourceMappingURL=Start.js.map