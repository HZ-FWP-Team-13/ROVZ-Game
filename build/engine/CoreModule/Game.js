import GameLoop from './GameLoop.js';
import Start from '../../game/scenes/screens/Start.js';
import UserData from '../../UserData.js';
export default class Game {
    canvas;
    ctx;
    playerStats;
    gameLoop;
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gameLoop = new GameLoop();
        this.gameLoop.start(new Start(this));
    }
    getPlayerStats() {
        return this.playerStats;
    }
    reset() {
        this.playerStats = new UserData(1, 3, 2);
    }
}
//# sourceMappingURL=Game.js.map