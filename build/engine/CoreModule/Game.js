import UserData from '../../UserData.js';
import GameLoop from './GameLoop.js';
import Start from '../../game/scenes/screens/Start.js';
export default class Game {
    canvas;
    ctx;
    _playerStats;
    _gameLoop;
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
    get playerStats() {
        return this._playerStats;
    }
    set playerStats(value) {
        this._playerStats = value;
    }
    get gameLoop() {
        return this._gameLoop;
    }
    set gameLoop(value) {
        this._gameLoop = value;
    }
}
//# sourceMappingURL=Game.js.map