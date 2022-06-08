import UserData from '../../UserData.js';
import GameLoop from './GameLoop.js';
import Start from '../../game/scenes/screens/Start.js';
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
    reset() {
        this.playerStats = new UserData(1, 3, 2);
    }
    getPlayerStats() {
        return this.playerStats;
    }
    setPlayerStats(value) {
        this.playerStats = value;
    }
    getGameLoop() {
        return this.gameLoop;
    }
    setGameLoop(value) {
        this.gameLoop = value;
    }
}
//# sourceMappingURL=Game.js.map