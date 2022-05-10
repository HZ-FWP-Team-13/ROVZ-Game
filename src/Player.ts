import GameItem from './GameItem.js';
import KeyListener from './KeyListener.js';
import KeyCommands from './KeyCommands.js';

export default class Player extends GameItem {
  private xVel: number;

  private yVel: number;

  // KeyboardListener so the player can move
  private keyCommands: KeyCommands;

  /**
   * Initialize Player
   *
   * @param xPos xPosition of the player
   * @param yPos yPostition of the player
   */
  public constructor(
    xPos: number,
    yPos: number,
  ) {
    super(32, 32, './assets/img/testplayer.png', xPos, yPos, 5, 128);

    this.xVel = 3;
    this.yVel = 3;
    this.currentAnimation = 'idle-down';
    this.keyCommands = new KeyCommands();
  }

  /**
   * Moves the player depending on which arrow key is pressed. Player is bound
   * to the canvas and cannot move outside of it
   *
   * @param canvas the canvas to move over, for max x and y positions
   */
  public move(canvas: HTMLCanvasElement): void {
    // Set the limit values
    const minX = 0;
    const maxX = canvas.width - this.img.width;
    const minY = 0;
    const maxY = canvas.height - this.img.height;

    // Moving right
    if (this.keyCommands.getKeys().isKeyDown(KeyListener.KEY_RIGHT) && this.xPos < maxX) {
      this.xPos += this.xVel;
      this.getSprite().setAnimation('walk-right');
      // Limit to the max value
      if (this.xPos > maxX) {
        this.xPos = maxX;
      }
    } else if (this.keyCommands.getKeys().isKeyTyped(KeyListener.KEY_RIGHT)
      && !this.keyCommands.getKeys().isKeyDown(KeyListener.KEY_RIGHT)) {
      this.getSprite().setAnimation('idle-right');
    }

    // Moving left
    if (this.keyCommands.getKeys().isKeyDown(KeyListener.KEY_LEFT) && this.xPos > minX) {
      this.xPos -= this.xVel;
      this.getSprite().setAnimation('walk-left');
      // Limit to the max value
      if (this.xPos < minX) {
        this.xPos = minX;
      }
    } else if (this.keyCommands.getKeys().isKeyTyped(KeyListener.KEY_LEFT)
      && !this.keyCommands.getKeys().isKeyDown(KeyListener.KEY_LEFT)) {
      this.getSprite().setAnimation('idle-left');
    }

    // Moving up
    if (this.keyCommands.getKeys().isKeyDown(KeyListener.KEY_UP) && this.yPos > minY) {
      this.yPos -= this.yVel;
      this.getSprite().setAnimation('walk-up');
      if (this.yPos < minY) {
        this.yPos = minY;
      }
    } else if (this.keyCommands.getKeys().isKeyTyped(KeyListener.KEY_UP)
      && !this.keyCommands.getKeys().isKeyDown(KeyListener.KEY_UP)) {
      this.getSprite().setAnimation('idle-up');
    }

    // Moving down
    if (this.keyCommands.getKeys().isKeyDown(KeyListener.KEY_DOWN) && this.yPos < maxY) {
      this.yPos += this.yVel;
      this.getSprite().setAnimation('walk-down');
      if (this.yPos > maxY) {
        this.yPos = maxY;
      }
    } else if (this.keyCommands.getKeys().isKeyTyped(KeyListener.KEY_DOWN)
      && !this.keyCommands.getKeys().isKeyDown(KeyListener.KEY_DOWN)) {
      this.getSprite().setAnimation('idle-down');
    }
  }

  /**
   *
   * @param other the other GameItem
   * @returns true if this object collides with the specified other object
   */
  public collidesWith(other: GameItem): boolean {
    return this.xPos < other.getXPos() + other.getImage().width
      && this.xPos + this.img.width > other.getXPos()
      && this.yPos < other.getYPos() + other.getImage().height
      && this.yPos + this.img.height > other.getYPos();
  }

  /**
   * Increases the speed
   *
   * @param size the amount of speed to add
   */
  public increaseSpeed(size: number): void {
    this.xVel += size;
    this.yVel += size;
  }

  /**
   * Get the keyboard and key command details
   *
   * @returns the keyboard and key command interactions
   */
  public getKeyboard(): KeyCommands {
    return this.keyCommands;
  }
}
