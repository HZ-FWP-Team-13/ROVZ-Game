import Screen from '../../../engine/SceneModule/Screen.js';
import Transform from '../../../engine/ComponentsModule/Transform.js';
import Level1 from '../levels/Level1.js';
import Vector2 from '../../../engine/MathModule/Vector2.js';
import GameOverMenu from '../../gameItems/menus/GameOverMenu copy.js';
import Start from './Start.js';
export default class GameOver extends Screen {
    menu;
    state;
    constructor(game, state) {
        super(game);
        this.state = state;
        const textXPos = this.game.canvas.width / 2;
        const textYPos = this.game.canvas.height / 2;
        this.menu = new GameOverMenu(new Map([
            [
                'play',
                new Transform(new Vector2(textXPos, textYPos + 200)),
            ],
            [
                'returnToTitle',
                new Transform(new Vector2(textXPos, textYPos + 260)),
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
            if (hoveredOption === 'returnToTitle') {
                return new Start(this.game);
            }
        }
        return null;
    }
    render() {
        const { ctx } = this.game;
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.menu.draw(this.game.ctx);
        const textXPos = this.game.canvas.width / 2;
        const textYPos = this.game.canvas.height / 2;
        ctx.textAlign = 'center';
        if (this.state === 'LOSS') {
            ctx.fillStyle = 'red';
            const text = 'GAME OVER!';
            ctx.fillText(text, textXPos, textYPos);
        }
        else if (this.state === 'WIN') {
            ctx.fillStyle = 'green';
            const text = 'LEVEL VOLTOOD!';
            ctx.fillText(text, textXPos, textYPos);
        }
    }
}
//# sourceMappingURL=GameOver.js.map