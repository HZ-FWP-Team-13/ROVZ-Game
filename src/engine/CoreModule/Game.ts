import UserData from '../../UserData.js';
import GameLoop from './GameLoop.js';
import Start from '../../game/scenes/screens/Start.js';

export default class Game {
  // Necessary canvas attributes
  public readonly canvas: HTMLCanvasElement;

  public readonly ctx: CanvasRenderingContext2D;

  private playerStats: UserData;

  private gameLoop: GameLoop;

  /**
   * Initialize the game
   *
   * @param canvas - The canvas element that the game
   * should be rendered upon
   */
  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Start the game cycle
    this.gameLoop = new GameLoop();
    this.gameLoop.start(new Start(this));
  }

  /**
   * Resets the game to the starting state.
   */
  public reset(): void {
    // Initialising the player's stats
    this.playerStats = new UserData(1, 3, 2);
  }

  /**
   * Get the Player Stats of this Game
   *
   * @returns The Player Stats of this Game
   */
  public getPlayerStats(): UserData {
    return this.playerStats;
  }

  /**
   * Set the Player Stats of this Game
   *
   * @param value The Player Stats of this Game
   */
  public setPlayerStats(value: UserData): void {
    this.playerStats = value;
  }

  /**
   * Get the GameLoop of this Game
   *
   * @returns The GameLoop of this Game
   */
  public getGameLoop(): GameLoop {
    return this.gameLoop;
  }

  /**
   * Set the GameLoop of this Game
   *
   * @param value The GameLoop of this Game
   */
  public setGameLoop(value: GameLoop): void {
    this.gameLoop = value;
  }
}
