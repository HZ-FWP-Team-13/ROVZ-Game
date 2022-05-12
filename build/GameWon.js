import GameOverScene from './GameOverScene.js';
export default class GameWon extends GameOverScene {
    constructor(game) {
        super(game);
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        const centerX = this.game.canvas.width / 2;
        this.game.writeTextToCanvas('You have won!', 128, centerX, 250, 'center', 'red');
        this.game.writeTextToCanvas("Press 'Spacebar' to Continue", 48, centerX, 550, 'center', 'white');
    }
}
//# sourceMappingURL=GameWon.js.map