import KeyListener from './KeyListener.js';

export default class KeyCommands {
  private keyboard: KeyListener;

  /**
   * Constructor for the KeyCommands class
   */
  constructor() {
    this.keyboard = new KeyListener();
  }

  /**
   * Method to declare keypresses without insantiating a new keyboard
   *
   * @returns the keys being pressed
   */
  public getKeys(): KeyListener {
    return this.keyboard;
  }

  /**
   * @returns true if the player is continuing up
   */
  public openControls(): boolean {
    return this.keyboard.isKeyTyped(KeyListener.KEY_M);
  }
}
