import KeyListener from './KeyListener.js';
export default class KeyCommands {
    keyboard;
    constructor() {
        this.keyboard = new KeyListener();
    }
    getKeys() {
        return this.keyboard;
    }
    openControls() {
        return this.keyboard.isKeyTyped(KeyListener.KEY_M);
    }
}
//# sourceMappingURL=KeyCommands.js.map